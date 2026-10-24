BEGIN;

ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS product_id uuid
REFERENCES public.products(id);

CREATE INDEX IF NOT EXISTS idx_orders_product_id
ON public.orders(product_id);

COMMIT;
