import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
  color: ${props => (props.white ? "#fff" : "#000")};
  font-family: "proxima-nova", sans-serif;
  margin: ${props => props.margin || ".5em 0"};
`;

export const Text = styled.p`
  font-size: 14px;
  font-family: "proxima-nova", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  font-weight: 400;
  color: #838383;
  margin: ${props => props.margin || ".5em 0"};
  ${props =>
    props.smalltitle &&
    css`
      font-size: 16px;
      font-weight: 600;
      line-height: 1.25;
      color: #000000;
    `};
  ${props =>
    props.orange &&
    css`
      color: #f75d19;
      cursor: pointer;
    `};
`;

export const Label = styled.label`
  color: #000;
  font-size: 16px;
  font-family: "proxima-nova", sans-serif;
`;

export const Nav = styled(Link)`
  color: #a3a3a3;
  font-size: 15px;
  margin-right: ${props => (props.right ? "0" : "2.25em")};
  font-family: "proxima-nova", sans-serif;
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
  cursor: pointer;
  background-color: #f75d19;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  border: none;
  font-family: "proxima-nova", sans-serif;
  margin-right: 2.25em;
  transition: 500ms;
  &:hover {
    background-color: #f9804a;
  }
  ${props =>
    props.circle &&
    css`
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background-color: #efeff4;
      color: #979797;
      border: 0px;
      align-items: center;
      justify-content: center;
      margin-right: ${props => (props.basketitem ? "12px" : "0px")};
      &:hover {
        background-color: #dbdbe6;
      }
    `}
  ${props =>
    props.signin &&
    css`
      width: 100%;
      height: 48px;
      border-radius: 4px;
      background-color: #f75d19;
      color: #fff;
      margin-right: 0;
      margin-top: 40px;
    `}
`;

export const Row = styled.div`
  display: flex;
  width: ${props => props.width};
  justify-content: ${props => props.justifycontent};
  align-items: ${props => props.alignitems};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  justify-content: ${props => props.justifycontent};
  align-items: ${props => props.alignitems};
`;
