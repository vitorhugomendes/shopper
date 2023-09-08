import styled, { keyframes } from 'styled-components';

const AnimationFadeIn = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  } to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const StyledProductsTable = styled.table`
  align-self: center;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: 'Inter', sans-serif;
  min-width: 400px;
  width: 100%;
  animation: ${AnimationFadeIn} 0.5s;

  .table-header {
    tr {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #ffffff;
      text-align: left;
    }
  }

  .table-body {
    tr {
      border-bottom: 1px solid #dddddd;
    }

    tr:last-of-type {
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    }

    tr.active-row {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  th,
  td {
    padding: 12px 15px;
  }

  .validation-list {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .validation-sucess {
      color: ${({ theme }) => theme.colors.sucess};
    }

    .validation-error {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;
