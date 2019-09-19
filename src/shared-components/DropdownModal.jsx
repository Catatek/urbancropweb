import React from "react";
import styled from "styled-components";
import { Row, Column, Text } from "../theme/index";

const Menu = styled.div`
  background: #fff;
  width: 200px;
  height: auto;
  position: absolute;
  right: 12em;
  top: 5em;
  display: flex;
  flex-direction: column;
  z-index: 2;
  @media (min-width: 980px) {
    right: 8em;
  }
  @media (min-width: 1180px) {
    right: 9em;
  }
  @media (min-width: 1280px) {
    right: 10em;
  }
  @media (min-width: 1580px) {
    right: 15em;
  }
  @media (min-width: 1680px) {
    right: 17em;
  }
  @media (min-width: 1780px) {
    right: 19em;
  }
  @media (min-width: 1880px) {
    right: 21em;
  }
  @media (min-width: 1980px) {
    right: 25em;
  }
  @media (min-width: 2080px) {
    right: 28em;
  }
`;

const StyledRow = styled(Row)`
  cursor: pointer;
  align-items: center;
  padding: 0.25em 0.75em;
  border-bottom: ${props => props.border && "0.5px solid #f1f1f2"};
  &:hover {
    background-color: #f7f7f7;
  }
`;

export default function DropdownModal({ display = false, options = [{}] }) {
  return (
    <div
      style={{
        display: display ? "block" : "none"
      }}
    >
      <Menu>
        <Column padding=".5em 0">
          {options.map((key, index) => {
            return (
              <StyledRow
                border={key.label !== "Logout"}
                key={index}
                onClick={() => key.onClick && key.onClick(key)}
              >
                <Text color={key.color}>{key.label}</Text>
              </StyledRow>
            );
          })}
        </Column>
      </Menu>
    </div>
  );
}
