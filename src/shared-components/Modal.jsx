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
  padding: 1em;
  border-radius: 4px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  @media (max-width: 780px) {
    width: 95%;
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
          <Row width="100%" justifycontent="space-between" alignitems="center">
            <Subtitle>{title}</Subtitle>
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
