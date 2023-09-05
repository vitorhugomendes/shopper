import { z } from 'zod';

const productsSchema = z.object({
  code: z.number(),
  name: z.string(),
  cost_price: z.string(),
});

const packSchema = z.object({
  id: z.number(),
  pack_id: z.number(),
  product_id: z.number(),
  qty: z.number(),
});

export { productsSchema, packSchema };
