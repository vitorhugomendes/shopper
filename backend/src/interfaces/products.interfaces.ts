import { z } from 'zod';
import { productsSchema, packSchema } from '../schemas/products.schemas';

type TProduct = z.infer<typeof productsSchema>;

type TPack = z.infer<typeof packSchema>;

export { TProduct, TPack };
