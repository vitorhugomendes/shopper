import { Router } from 'express';
import { client } from '../db';
import { validateProductsController } from '../controllers/products.controllers';

const productRoutes: Router = Router();

import { Response, Request } from 'express';
const getFunction = async (request: Request, response: Response) => {
  const result = await client.query('SELECT * FROM packs;');

  const res = response.json(result[0]);

  return res;
};
productRoutes.get('', getFunction);

productRoutes.post('/validate', validateProductsController);

export default productRoutes;
