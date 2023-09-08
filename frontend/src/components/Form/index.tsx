import { useState } from 'react';
import { StyledForm } from './style';
import { parse, ParseResult } from 'papaparse';
import useProducts from '../../hooks/useProducts';

const Form = () => {
  const [file, setFile] = useState<File[]>();

  const { validateProducts } = useProducts();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: ParseResult<File>) {
        setFile(results.data);
      },
    });
  };

  return (
    <StyledForm>
      <input type="file" accept=".csv" onChange={changeHandler}></input>
      <button
        type="button"
        onClick={() => validateProducts(file!)}
        disabled={!file}
      >
        Validar
      </button>
      <button type="submit">Atualizar</button>
    </StyledForm>
  );
};

export default Form;
