import { Router } from 'express';
import { client } from '../db';
import { Response, Request } from 'express';

const productRoutes: Router = Router();

const getFunction = async (request: Request, response: Response) => {
  const result = await client.query('SELECT * FROM packs;');

  const res = response.json(result[0]);

  return res;
};

productRoutes.get('', getFunction);

export default productRoutes;
