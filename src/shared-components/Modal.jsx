import React, { Component } from "react";
import styled from "styled-components";
import { Subtitle, Row } from "../theme/index";
import { FaTimes } from "react-icons/fa";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10000000000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  justify-content: center;
  background: #fff;
  width: auto;
  height: auto;
  padding: 1.5em 0;
  border-radius: 8px;
  display: flex;
  margin: 0 auto;
  min-width: 440px;
  flex-direction: column;
  @media (max-width: 780px) {
    width: 90%;
    min-width: 325px;
  }
`;

const Circle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #f1f1f2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  cursor: pointer;
  transition: 250ms;
  &:hover {
    background-color: #dfdfe2;
  }
`;

export class Modal extends Component {
  render() {
    const { show, children, title, toggleModal } = this.props;
    if (!show) {
      return null;
    }
    return (
      <Backdrop>
        <Div>
          <Row
            margin="0 auto"
            width="85%"
            justifycontent="space-between"
            alignitems="center"
          >
            <div style={{ width: "85%" }}>
              <Subtitle>{title}</Subtitle>
            </div>
            <Circle onClick={toggleModal}>
              <FaTimes size={14} color="#000" />
            </Circle>
          </Row>
          {children}
        </Div>
      </Backdrop>
    );
  }
}
