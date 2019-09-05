import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
  text-align: center;
  color: ${props => (props.white ? "#fff" : "#000")};
  font-family: "Ubuntu", sans-serif;
  margin: ${props => props.margin || ".5em 0"};
`;

export const Text = styled.p`
  font-size: 14px;
  font-family: "Ubuntu", sans-serif;
  line-height: 1.43;
  font-weight: 400;
  color: #838383;
  margin: ${props => props.margin || ".5em 0"}
    ${props =>
      props.smalltitle &&
      css`
        font-size: 16px;
        font-weight: 600;
        line-height: 1.25;
        color: #000000;
      `};
`;

export const Nav = styled(Link)`
  color: #a3a3a3;
  font-size: 15px;
  margin-right: ${props => (props.right ? "0" : "2.25em")};
  font-family: "Ubuntu", sans-serif;
  font-weight: 600;
  text-decoration: none;
  padding: 0.25em 0;
  border-bottom: 3px solid transparent;
  padding: ${props => (props.right ? "0" : ".25em")};
  @media (max-width: 780px) {
    font-size: 10px;
    padding: 0;
    margin-right: 0;
  }
`;

export const Button = styled.button`
  width: 94px;
  height: 34px;
  border-radius: 4px;
  background-color: #f75d19;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  border: none;
  font-family: "Ubuntu", sans-serif;
  margin-right: 2.25em;
  ${props => props.nav && css``}
`;
