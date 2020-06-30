import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2em;
  background: ${({ theme }) => theme.body};
  transition: all 0.25s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 700px) {
    padding: 0;
    width: 100%;
    margin-top: 50px;
  }
`;
