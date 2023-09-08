import { useEffect, useState } from 'react';
import { StyledForm } from './style';
import { parse, ParseResult } from 'papaparse';
import useProducts from '../../hooks/useProducts';

const Form = () => {
  const [file, setFile] = useState<File[] | null>(null);

  const {
    validateProducts,
    updateProducts,
    products,
    validated,
    setValidated,
  } = useProducts();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    setValidated(false);

    parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: ParseResult<File>) {
        setFile(results.data);
      },
    });
  };

  useEffect(() => {
    if (products) {
      products.forEach((product) => {
        if (product.errors.length > 0) {
          setValidated(false);
        }
      });
    }
  }, [products, setValidated]);

  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault();
        updateProducts(file!);
      }}
    >
      <input type="file" accept=".csv" id="file" onChange={changeHandler} />
      <div className="buttons-container">
        <button
          type="button"
          onClick={() => {
            setValidated(true);
            validateProducts(file!);
          }}
          disabled={!file}
          title={
            file
              ? 'Validar o arquivo'
              : 'Carregue o arquivo para habilitar esse botão'
          }
        >
          Validar
        </button>
        <button
          type="submit"
          disabled={!validated}
          title={
            validated
              ? 'Alterar os preços dos produtos'
              : 'Valide um arquivo sem erros para habilitar esse botão'
          }
        >
          Atualizar
        </button>
      </div>
    </StyledForm>
  );
};

export default Form;
