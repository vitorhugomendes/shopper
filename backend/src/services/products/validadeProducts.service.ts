import { RowDataPacket } from 'mysql2';
import { client } from '../../db';
import {
  IProduct,
  IRequestValidate,
  TValidatedProduct,
} from '../../interfaces/products.interfaces';

const validateProductsService = async (
  productsData: IRequestValidate[]
): Promise<TValidatedProduct[]> => {
  const findProductsQuery: string = 'SELECT * FROM products WHERE code = ?';
  const findProducts: TValidatedProduct[] = await Promise.all(
    productsData.map(async (productData) => {
      const { product_code, new_price } = productData;

      const findProduct = await client.query<IProduct[] & RowDataPacket[]>(
        findProductsQuery,
        [product_code]
      );

      const product: IProduct | undefined = findProduct[0][0];

      let validatedProduct: TValidatedProduct = {
        code: Number(product_code),
        new_price,
        errors: [],
      };

      if (!product_code) {
        validatedProduct.code = 'Não encontrado';
        validatedProduct.errors?.push(
          'O arquivo não contém o código do produto'
        );
      }

      if (!new_price) {
        validatedProduct.new_price = 'Não encontrado';
        validatedProduct.errors?.push(
          'O arquivo não contém o novo preço do produto'
        );
      }

      if (!product) {
        validatedProduct.errors?.push('Produto não encontrado');
      } else {
        validatedProduct = { ...product, ...validatedProduct };

        const actualCostPrice = Number(product.cost_price);
        const actualPrice = Number(product.sales_price);
        const newPrice = Number(new_price);

        if (actualCostPrice > newPrice) {
          validatedProduct.errors?.push(
            'O novo preço é menor que o preço de custo do produto'
          );
        }

        const salesPriceTenPercent = (10 / 100) * actualPrice;

        if (newPrice > actualPrice + salesPriceTenPercent) {
          validatedProduct.errors.push(
            'O novo preço é um aumento maior que 10% do preço atual do produto'
          );
        } else if (newPrice < actualPrice - salesPriceTenPercent) {
          validatedProduct.errors.push(
            'O novo preço é uma diminuição maior que 10% do preço atual do produto'
          );
        }
      }

      return validatedProduct;
    })
  );

  return findProducts;
};

export default validateProductsService;
