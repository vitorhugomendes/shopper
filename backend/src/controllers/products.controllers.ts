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

  return response.json(validateProducts).send();
};

const editProductsController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const productsData = request.body;

  const editProducts = await editProductsService(productsData);

  return response.json(editProducts).send();
};

export { validateProductsController, editProductsController };
