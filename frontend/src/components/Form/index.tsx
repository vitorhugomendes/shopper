import { useEffect, useState } from 'react';
import { StyledForm } from './style';
import { parse, ParseResult } from 'papaparse';
import useProducts from '../../hooks/useProducts';

const Form = () => {
  const [file, setFile] = useState<File[] | null>(null);

  const { validateProducts, products } = useProducts();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    if (!event.target.files) return;

    parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: ParseResult<File>) {
        setFile(results.data);
      },
    });
  };

  useEffect(() => {
    console.log(products);
    console.log(file);
  }, [products, file]);

  return (
    <StyledForm>
      <input type="file" accept=".csv" onChange={changeHandler}></input>
      <div className="buttons-container">
        <button
          type="button"
          onClick={() => validateProducts(file!)}
          disabled={!file}
        >
          Validar
        </button>
        <button type="submit" disabled={!products}>
          Atualizar
        </button>
      </div>
    </StyledForm>
  );
};

export default Form;
