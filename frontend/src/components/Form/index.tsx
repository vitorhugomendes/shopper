import { useState } from 'react';
import { StyledForm } from './style';
import { parse, ParseResult } from 'papaparse';
import { api } from '../../services/api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios';

// interface IFile {
//   new_price: string;
//   product_code?: string;
//   pack_id?: string;
// }

const Form = () => {
  const [file, setFile] = useState<File[]>();

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

  const validateFile = async () => {
    try {
      const response = await api.patch('/products/validate', file);
      console.log(response);
    } catch (error: AxiosError | unknown) {
      if (axios.isAxiosError(error)) {
        console.log(`${error?.response?.data.message}`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <StyledForm>
      <input type="file" accept=".csv" onChange={changeHandler}></input>
      <button type="button" onClick={validateFile} disabled={!file}>
        Validar
      </button>
      <button type="submit">Atualizar</button>
    </StyledForm>
  );
};

export default Form;
