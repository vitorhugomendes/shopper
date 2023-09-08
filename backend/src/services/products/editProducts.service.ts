import { RowDataPacket } from 'mysql2';
import { client } from '../../db';
import {
  IProduct,
  IRequestUpdateProducts,
} from '../../interfaces/products.interfaces';

const editProductsService = async (
  productsData: IRequestUpdateProducts[]
): Promise<IProduct[]> => {
  const updateProducts = await Promise.all(
    productsData.map(async ({ new_price, product_code }) => {
      const updateProductQuery: string =
        'UPDATE products SET sales_price = ? WHERE code = ?';
      const updateProduct = await client.query<RowDataPacket[]>(
        updateProductQuery,
        [new_price, product_code]
      );

      const findProductsQuery: string = 'SELECT * FROM products WHERE code = ?';
      const findProduct = await client.query<IProduct[] & RowDataPacket[]>(
        findProductsQuery,
        [product_code]
      );

      return findProduct[0][0];
    })
  );

  return updateProducts;
};

export default editProductsService;
