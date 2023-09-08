import { ReactNode } from 'react';

interface IProductsProviderProps {
  children: ReactNode;
}

interface IProductsContextValues {
  validateProducts: (file: File[]) => Promise<void>;
  updateProducts: (file: File[]) => Promise<void>;
  products: IProduct[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | undefined>>;
}

interface IPack {
  id: number;
  pack_id: number;
  product_id: number;
  qty: number;
}

interface IProduct {
  code: number;
  name: string;
  cost_price: string;
  sales_price: string;
  new_price: string;
  type: 'pack' | 'product';
  packs: IPack[];
  errors: string[];
}

export type { IProductsProviderProps, IProductsContextValues, IProduct };
