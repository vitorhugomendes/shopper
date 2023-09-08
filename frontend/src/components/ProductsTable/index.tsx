import { StyledProductsTable } from './style';
import { v4 as uuidv4 } from 'uuid';
import useProducts from '../../hooks/useProducts';

const ProductsTable = () => {
  const { products } = useProducts();

  if (!products) return null;

  return (
    <StyledProductsTable>
      <thead className="table-header">
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Preço Atual</th>
          <th>Novo Preço</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {products?.map((product) => {
          const { code, name, new_price, sales_price, errors } = product;

          return (
            <tr key={uuidv4()}>
              <td>{code}</td>
              <td>{name}</td>
              <td>
                {Number(sales_price).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>
                {Number(new_price).toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td>
                <ul className="validation-list">
                  {errors.length < 1 ? (
                    <li key={uuidv4()} className="validation-sucess">
                      Tudo certo com esse produto.
                    </li>
                  ) : (
                    errors.map((error) => (
                      <li key={uuidv4()} className="validation-error">
                        {error}
                      </li>
                    ))
                  )}
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </StyledProductsTable>
  );
};

export default ProductsTable;
