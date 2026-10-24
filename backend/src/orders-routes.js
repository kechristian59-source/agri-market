import { z } from 'zod';

export function registerOrderRoutes(app, pool, auth, requireDb) {
  const createSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.coerce.number().finite().positive().max(100000000),
    fulfilmentMethod: z.enum(['Delivery', 'Pickup'])
  });

  const statusSchema = z.object({
    status: z.enum(['Accepted', 'Rejected', 'Completed'])
  });

  app.get('/api/orders', requireDb, auth, async (req, res) => {
    try {
      const q = await pool.query(
        `SELECT o.id, o.product_id, o.buyer_user_id, o.seller_user_id,
                o.quantity, o.unit, o.total_amount, o.fulfilment_method,
                o.status, o.created_at, p.product_name,
                b.full_name AS buyer, b.phone AS buyer_phone,
                s.full_name AS seller, s.phone AS seller_phone
         FROM orders o
         LEFT JOIN products p ON p.id = o.product_id
         LEFT JOIN users b ON b.id = o.buyer_user_id
         LEFT JOIN users s ON s.id = o.seller_user_id
         WHERE o.buyer_user_id = $1 OR o.seller_user_id = $1
         ORDER BY o.created_at DESC`,
        [req.auth.sub]
      );
      res.json(q.rows);
    } catch {
      res.status(500).json({ error: 'DATABASE_ERROR' });
    }
  });

  app.post('/api/orders', requireDb, auth, async (req, res) => {
    if (req.auth.role !== 'buyer') {
      return res.status(403).json({ error: 'BUYER_REQUIRED' });
    }

    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'INVALID_INPUT' });
    }

    const { productId, quantity, fulfilmentMethod } = parsed.data;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const product = await client.query(
        `SELECT id, owner_user_id, product_name, quantity, unit,
                price, status
         FROM products WHERE id = $1 FOR UPDATE`,
        [productId]
      );

      if (!product.rowCount) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'PRODUCT_NOT_FOUND' });
      }

      const p = product.rows[0];

      if (p.owner_user_id === req.auth.sub) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'CANNOT_ORDER_OWN_PRODUCT' });
      }

      if (p.status !== 'Available' || Number(p.quantity) < quantity) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'INSUFFICIENT_STOCK' });
      }

      const seller = await client.query(
        `SELECT id FROM users WHERE id = $1`,
        [p.owner_user_id]
      );

      if (!seller.rowCount) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'SELLER_NOT_FOUND' });
      }

      const inserted = await client.query(
        `INSERT INTO orders
           (product_id, buyer_user_id, seller_user_id, quantity, unit,
            total_amount, fulfilment_method, status)
         VALUES ($1, $2, $3, $4, $5, $6::numeric * $4::numeric, $7, 'Pending')
         RETURNING *`,
        [p.id, req.auth.sub, p.owner_user_id, quantity, p.unit, p.price, fulfilmentMethod]
      );

      await client.query(
        `UPDATE products
         SET quantity = quantity - $1,
             status = CASE WHEN quantity - $1 = 0 THEN 'Sold' ELSE 'Available' END
         WHERE id = $2`,
        [quantity, p.id]
      );

      await client.query('COMMIT');
      res.status(201).json({ ...inserted.rows[0], product_name: p.product_name });
    } catch {
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'DATABASE_ERROR' });
    } finally {
      client.release();
    }
  });

  app.patch('/api/orders/:id/status', requireDb, auth, async (req, res) => {
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'INVALID_INPUT' });
    }

    const { status } = parsed.data;
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const found = await client.query(
        `SELECT * FROM orders WHERE id = $1 FOR UPDATE`,
        [req.params.id]
      );

      if (!found.rowCount) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'ORDER_NOT_FOUND' });
      }

      const order = found.rows[0];
      const isSeller = order.seller_user_id === req.auth.sub;
      const isBuyer = order.buyer_user_id === req.auth.sub;

      if (!isSeller && !isBuyer) {
        await client.query('ROLLBACK');
        return res.status(403).json({ error: 'ORDER_ACCESS_DENIED' });
      }

      if (status === 'Accepted' || status === 'Rejected') {
        if (!isSeller || order.status !== 'Pending') {
          await client.query('ROLLBACK');
          return res.status(409).json({ error: 'INVALID_ORDER_TRANSITION' });
        }

        if (status === 'Rejected') {
          const restored = await client.query(
            `UPDATE products
             SET quantity = quantity + $1, status = 'Available'
             WHERE id = $2 RETURNING id`,
            [order.quantity, order.product_id]
          );

          if (!restored.rowCount) {
            await client.query('ROLLBACK');
            return res.status(409).json({ error: 'PRODUCT_NOT_FOUND' });
          }
        }
      } else if (!isBuyer || order.status !== 'Accepted') {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: 'INVALID_ORDER_TRANSITION' });
      }

      const updated = await client.query(
        `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
        [status, order.id]
      );

      await client.query('COMMIT');
      res.json(updated.rows[0]);
    } catch {
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'DATABASE_ERROR' });
    } finally {
      client.release();
    }
  });
}
