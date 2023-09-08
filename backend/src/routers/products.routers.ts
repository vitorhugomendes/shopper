import { Router } from 'express';
import {
  validateProductsController,
  editProductsController,
} from '../controllers/products.controllers';

const productRoutes: Router = Router();

productRoutes.post('/validate', validateProductsController);
productRoutes.patch('', editProductsController);

export default productRoutes;
