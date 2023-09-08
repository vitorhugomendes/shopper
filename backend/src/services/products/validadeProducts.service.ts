import { RowDataPacket } from 'mysql2';
import { client } from '../../db';
import {
  IPack,
  IProduct,
  IRequestValidate,
  TValidatedProduct,
  TSalesPrice,
} from '../../interfaces/products.interfaces';

const validateProductsService = async (
  productsData: IRequestValidate[]
): Promise<TValidatedProduct[]> => {
  let validatedProducts: TValidatedProduct[] = await Promise.all(
    productsData.map(async (productData) => {
      const { product_code, new_price } = productData;

      let validatedProduct: TValidatedProduct = {
        code: Number(product_code),
        new_price,
        type: 'product',
        packs: [],
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

      if (isNaN(Number(product_code))) {
        validatedProduct.errors?.push(
          'O código do produto não está no formato correto'
        );
      }

      if (isNaN(Number(new_price))) {
        validatedProduct.errors?.push(
          'O preço do produto não está no formato correto'
        );
      }

      const findProductsQuery: string = 'SELECT * FROM products WHERE code = ?';
      const findProduct = await client.query<IProduct[] & RowDataPacket[]>(
        findProductsQuery,
        [product_code]
      );

      const product: IProduct | undefined = findProduct[0][0];

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

        const findPacksQuery: string =
          'SELECT * FROM packs WHERE product_id = ?';
        const findPacks = await client.query<IPack[] & RowDataPacket[]>(
          findPacksQuery,
          [product_code]
        );

        const packs: IPack[] | undefined = findPacks[0];
        if (packs[0]) {
          validatedProduct.type = 'product';
          validatedProduct.packs = packs;
        } else {
          const findPackProductsQuery: string =
            'SELECT * FROM packs WHERE pack_id = ?';
          const findPackProducts = await client.query<
            IPack[] & RowDataPacket[]
          >(findPackProductsQuery, [product_code]);

          const packProducts: IPack[] | undefined = findPackProducts[0];

          if (packProducts[0]) {
            validatedProduct.type = 'pack';
            validatedProduct.packs = packProducts;
          }
        }
      }

      return validatedProduct;
    })
  );

  const checkProductsAndPacks = async () => {
    for (let { type, packs, code, errors, new_price } of validatedProducts) {
      if (type === 'product' && packs?.length > 0) {
        const foundPack = validatedProducts.find(
          (product) =>
            product.type === 'pack' &&
            product.packs.some((pack: IPack) => pack.product_id === code)
        );

        if (!foundPack) {
          errors.push('Erro: O pack correspondente não foi encontrado.');
        } else {
          let productQuantity = 0;
          let totalWithoutProduct = 0;

          await Promise.all(
            foundPack.packs.map(async (pack) => {
              if (pack.product_id === code) {
                productQuantity = pack.qty;
              } else {
                const findSalesPriceQuery: string =
                  'SELECT sales_price FROM products WHERE code = ?';
                const findSalesPrice = await client.query<
                  TSalesPrice & RowDataPacket[]
                >(findSalesPriceQuery, [pack.product_id]);

                const salesPrice: string = findSalesPrice[0][0].sales_price;

                totalWithoutProduct += Number(salesPrice) * pack.qty;
                const totalPrice = Number(
                  (
                    totalWithoutProduct +
                    productQuantity * Number(new_price)
                  ).toFixed(2)
                );

                if (totalPrice != Number(foundPack.new_price)) {
                  errors.push(
                    'O preço total dos produtos não corresponde ao preço do pacote'
                  );
                }
              }
            })
          );
        }
      } else if (type === 'pack') {
        if (packs.length > 0) {
          const foundProduct = validatedProducts.find(
            (product) =>
              product.type === 'product' &&
              product.packs.some((pack: IPack) => pack.pack_id === code)
          );
          if (!foundProduct) {
            errors.push('Erro: O produto correspondente não foi encontrado.');
          } else {
            let productQuantity = 0;
            let totalWithoutProduct = 0;

            await Promise.all(
              foundProduct.packs.map(async (pack) => {
                if (pack.pack_id === code) {
                  productQuantity = pack.qty;
                } else {
                  const findSalesPriceQuery: string =
                    'SELECT sales_price FROM products WHERE code = ?';
                  const findSalesPrice = await client.query<
                    TSalesPrice & RowDataPacket[]
                  >(findSalesPriceQuery, [pack.product_id]);

                  const salesPrice: string = findSalesPrice[0][0].sales_price;

                  totalWithoutProduct += Number(salesPrice) * pack.qty;
                  const totalPrice = Number(
                    (
                      totalWithoutProduct +
                      productQuantity * Number(new_price)
                    ).toFixed(2)
                  );

                  if (totalPrice != Number(foundProduct.new_price)) {
                    errors.push(
                      'O preço total do pacote não corresponde ao preço do produto'
                    );
                  }
                }
              })
            );
          }
        }
      }
    }
  };

  await checkProductsAndPacks();

  return validatedProducts;
};

export default validateProductsService;
