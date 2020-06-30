import styled from "styled-components";

export const Container = styled.div`
  color: ${({ theme }) => theme.text};
  width: 100%;
  min-height: 500px;
  margin: auto;
  background-color: ${({ theme }) => theme.body};
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2rem 6rem 0.5rem rgba(101, 90, 86, 0.2);
  @media (max-width: 700px) {
    width: 100%;
  }
`;
