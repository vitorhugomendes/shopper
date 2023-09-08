import styled, { css } from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;

  .buttons-container {
    display: flex;
    gap: 10px;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    border-radius: 8px;
    padding: 10px;

    ${({ theme }) => {
      return css`
        background-color: ${theme.colors.secondary};
        color: ${theme.colors.background};
      `;
    }}

    transition: 0.4s;
  }

  button:disabled {
    cursor: default;
    background-color: #cccccc;
    color: #666666;
  }
`;
