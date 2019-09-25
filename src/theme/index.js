import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
  color: ${props => (props.white ? "#fff" : "#000")};
  font-family: "proxima-nova", sans-serif;
  margin: ${props => props.margin || ".5em 0"};
  @media (max-width: 620px) {
    font-size: 26px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  font-family: "proxima-nova", sans-serif;
  margin: 0;
  line-height: 1.25;
  letter-spacing: normal;
  color: #000000;
  @media (max-width: 620px) {
    font-size: 20px;
  }
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
  ${props =>
    props.basketitem &&
    css`
      color: ${props =>
        props.orange ? "#f75d19" : props.black ? "#000" : "#a3a3a3"};
      font-size: 15px;
      text-transform: ${props => (props.orange ? "capitalize" : "none")};
      font-weight: 600;
    `};
  ${props =>
    props.error &&
    css`
      color: red;
      margin: 0.25em 0 0.5em 0;
    `};
`;

export const Label = styled.label`
  color: #000;
  font-size: 16px;
  font-family: "proxima-nova", sans-serif;
  ${props =>
    props.extrasmall &&
    css`
      font-size: 14px;
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.38;
      letter-spacing: -0.08px;
      color: #8e8e93;
      text-transform: uppercase;
    `};
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
    font-size: 12px;
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
  transition: 500ms;
  @media (max-width: 780px) {
    font-size: 12px;
  }
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
    ${props =>
      props.marketsearch &&
      css`
        width: 172px;
        height: 34px;
        border-radius: 17px;
        border: solid 1px #f75d19;
        background: #fff;
        color: #f75d19;
        margin-right: 0;
        font-size: 14px;
        margin-top: 12px;
        &:hover {
          background-color: #fff;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        }
      `}
      ${props =>
        props.basket &&
        css`
          width: 90px;
          height: 32px;
          border-radius: 10px;
          background-color: #f75d19;
          border: 0px;
          align-items: center;
          justify-content: center;
        `}
        ${props =>
          props.delete &&
          css`
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 48px;
            border-radius: 4px;
            border-color: #ff2d3c;
            border-width: 1px;
          `}
          ${props =>
            props.checkout &&
            css`
              width: 280px;
              height: 48px;
              border-radius: 4px;
              margin: ${props => props.margin};
              background-color: ${props => (props.active ? "#f75d19" : "#ccc")};
              cursor: ${props => (props.active ? "pointer" : "default")};
              &:hover {
                background-color: ${props =>
                  props.active ? "#f9804a" : "#ccc"};
              }
            `}
`;

export const Row = styled.div`
  display: flex;
  width: ${props => props.width};
  justify-content: ${props => props.justifycontent};
  align-items: ${props => props.alignitems};
  margin: ${props => props.margin};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
  justify-content: ${props => props.justifycontent};
  align-items: ${props => props.alignitems};
  margin: ${props => props.margin};
  align-content: ${props => props.aligncontent};
`;
