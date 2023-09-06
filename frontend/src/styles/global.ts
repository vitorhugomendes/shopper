import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    padding: 0;
    outline:0;
    border: none;
    list-style: none;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
  }

  body{
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
  }
`;
