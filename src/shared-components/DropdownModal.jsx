import React from "react";
import styled from "styled-components";
import { Row, Column, Text } from "../theme/index";

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
  border-bottom: 7px solid #fff;
  margin: 0 0 0 5em;
  left: -0.2em;
  bottom: 1.6em;
  position: absolute;
  z-index: 5;
  transform: rotate(0.75turn);
`;

const Icon = styled.i`
  color: #4d4d4d;
  font-size: 1.1em;
  margin: 0 0.75em;
`;

const Menu = styled.div`
  background: #fff;
  border-radius: 3px;
  width: 200px;
  min-height: 175px;
  position: absolute;
  left: 5.5em;
  bottom: 1.2em;
  display: flex;
  flex-direction: column;
  z-index: 2;
  box-shadow: 0 2px 8px 0 rgba(34, 34, 34, 0.5);
`;

const StyledRow = styled(Row)`
  cursor: pointer;
  align-items: center;

  padding: 0.3em 0;
  &:hover {
    background-color: #f7f7f7;
  }
`;

export default function DropdownModal({
  display = false,
  options = [{}],
  userdetails,
  initials,
  notifications,
  type
}) {
  return (
    <div
      style={{
        display: display ? "block" : "none"
      }}
    >
      <Arrow />
      <Menu>
        <Column padding=".5em 0">
          {options.map((key, index) => {
            return (
              <StyledRow
                key={index}
                onClick={() => key.onClick && key.onClick(key)}
              >
                <Icon className={key.iconClassName} />
                <Text color={key.color}>{key.label}</Text>
              </StyledRow>
            );
          })}
        </Column>
      </Menu>
    </div>
  );
}
