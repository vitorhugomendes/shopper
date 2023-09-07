import { Request, Response } from 'express';
import {
  validateProductsService,
  editProductsService,
} from '../services/products';

const validateProductsController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const productsData = request.body;

  const validateProducts = await validateProductsService(productsData);

  return response.json(validateProducts);
};

export { validateProductsController };
