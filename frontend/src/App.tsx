import Home from './pages/Home';
import { GlobalStyles } from './styles/global';
import { ProductsProvider } from './providers/ProductsProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ProductsProvider>
        <Home />
      </ProductsProvider>
    </>
  );
};

export default App;
