import { useContext } from 'react';
import { ProductsContext } from '../providers/ProductsProvider';

const useProducts = () => {
  const productsContext = useContext(ProductsContext);

  return productsContext;
};

export default useProducts;
