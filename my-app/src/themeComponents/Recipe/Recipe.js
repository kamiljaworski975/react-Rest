import styled from "styled-components";

export const HeaderLogo = styled.img`
  margin: auto;
  height: 6rem;
  display: block;
`;

export const LikesField = styled.div`
  cursor: pointer;
  height: 100%;
  transition: all 0.3s;
`;

export const RecipeLike = styled.div`
  position: absolute;
  right: 0;
  top: 6rem;
  z-index: 10;
  padding: 1rem 0;
  width: 24rem;
  height: 27rem;
  background-color: #fff;
  box-shadow: 0 0.8rem 5rem 2rem rgba(101, 90, 86, 0.1);
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s 0.2s;

  ${LikesField}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;
