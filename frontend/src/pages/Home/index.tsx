import { StyledHomePage } from './styled';
import Form from '../../components/Form';

const Home = () => {
  return (
    <StyledHomePage>
      <div>
        <h1 className="title">Bem vindo(a)</h1>
        <p className="description">
          Insira um arquivo <span>.csv</span> para atualizar os preços dos
          produtos
        </p>
      </div>

      <Form />
    </StyledHomePage>
  );
};

export default Home;
