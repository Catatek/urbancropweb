import React, { Component } from "react";
import styled from "styled-components";
import { Text, Column } from "../theme";
import { connect } from "react-redux";
import { dataSelector } from "../store/selectors/data";

const MessageBox = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #eee;
  border-left: ${props => props.border};
  padding: 0.5em 0.25em;
  width: 285px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  height: 60px;
  border-radius: 3px;
  z-index: 10000000000;
  margin-top: 0.8em;
`;

const MessageDiv = styled.div`
  position: fixed;
  right: 1.5em;
  top: 6em;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 500px) {
    display: none;
  }
`;

const I = styled.i`
  color: ${props => props.color};
  font-size: 2.2em;
  margin: 0 0.5em;
`;

class GlobalMessage extends Component {
  getColor = value => {
    switch (value) {
      case "ERROR":
        return "#EF525B";
      default:
        return "#3AAA35";
    }
  };

  getIcon = value => {
    switch (value) {
      case "ERROR":
        return "fas fa-exclamation-circle";
      default:
        return "far fa-check-circle";
    }
  };

  render() {
    const { messages } = this.props;
    if (!this.props.show) {
      return null;
    }
    return (
      <MessageDiv>
        {messages.valueSeq().map((value, key) => {
          return (
            <MessageBox
              key={key}
              className={this.props.show ? "fadeIn" : ""}
              border={`6px solid ${this.getColor(value.type)}`}
            >
              <I
                color={this.getColor(value.type)}
                className={this.getIcon(value.type)}
              />
              <Column>
                <Text smalltitle margin="0">
                  {value.message[0]}
                </Text>
                <Text margin=".05em 0 0 0">{value.message[1]}</Text>
              </Column>
            </MessageBox>
          );
        })}
      </MessageDiv>
    );
  }
}

export default connect(
  dataSelector,
  {}
)(GlobalMessage);
