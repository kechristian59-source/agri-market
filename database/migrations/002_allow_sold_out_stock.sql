BEGIN;

ALTER TABLE public.products
DROP CONSTRAINT IF EXISTS products_quantity_check;

ALTER TABLE public.products
ADD CONSTRAINT products_quantity_check
CHECK (quantity >= 0);

COMMIT;
