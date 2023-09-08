import { StyledHomePage } from './styled';
import { Form, ProductsTable } from '../../components';

const Home = () => {
  return (
    <StyledHomePage>
      <div className="home-container">
        <div className="home-header">
          <h1 className="title">Atualização de preços</h1>
          <p className="description">
            Insira um arquivo <span>.csv</span> para atualizar os preços dos
            produtos
          </p>
        </div>
        <Form />
        <ProductsTable />
      </div>
    </StyledHomePage>
  );
};

export default Home;
