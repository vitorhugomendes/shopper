import styled from 'styled-components';

export const StyledHomePage = styled.main`
  padding: 50px;

  .home-container {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    gap: 20px;
  }

  .home-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;

    .title {
      font-family: 'IBM Plex Sans';
      font-weight: 700;
    }

    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
