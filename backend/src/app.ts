import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import { handleErrors } from './error';
import productRoutes from './routers/products.routers';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);

app.use(handleErrors);

export default app;
