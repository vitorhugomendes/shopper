import { createContext, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import {
  IProductsContextValues,
  IProductsProviderProps,
  IProduct,
} from './@types';

const ProductsContext = createContext({} as IProductsContextValues);

const ProductsProvider = ({ children }: IProductsProviderProps) => {
  const [products, setProducts] = useState<IProduct[]>();

  const validateProducts = async (file: File[]) => {
    try {
      const response = await api.post('/products/validate', file);
      setProducts(response.data);
      toast.success('Validação do arquivo feita com sucesso');
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error?.response?.data.message}`);
      } else {
        console.log(error);
      }
    }
  };

  const updateProducts = async (file: File[]) => {
    try {
      await api.patch('/products/', file);
      toast.success('Preços editados com sucesso!');
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error?.response?.data.message}`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        validateProducts,
        updateProducts,
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsProvider };
