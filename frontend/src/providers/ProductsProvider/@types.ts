import { ReactNode } from 'react';

interface IProductsProviderProps {
  children: ReactNode;
}

interface IProductsContextValues {
  validateProducts: (file: File[]) => Promise<void>;
  updateProducts: (file: File[]) => Promise<void>;
  validatedProducts: IValidatedProduct | undefined;
  setValidatedProducts: React.Dispatch<
    React.SetStateAction<IValidatedProduct | undefined>
  >;
}

interface IPack {
  id: number;
  pack_id: number;
  product_id: number;
  qty: number;
}

interface IValidatedProduct {
  code: number;
  name: string;
  cost_price: string;
  sales_price: string;
  new_price: string;
  type: 'pack' | 'product';
  packs: IPack[];
  errors: string[];
}

export type {
  IProductsProviderProps,
  IProductsContextValues,
  IValidatedProduct,
};
