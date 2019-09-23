import React from "react";
import styled from "styled-components";
import { Text, Label, Row } from "../../theme";
import { FaAngleRight } from "react-icons/fa";

const StyledImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 14px;
`;

const StyledSettingText = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  margin-right: 17px;
  color: #a3a3a3;
`;

const StyledRow = styled(Row)`
  height: 60px;
  align-items: center;
  min-width: 280px;
  border-bottom: ${props =>
    props.border ? ".5px solid #d5d5d5" : ".5px solid transparent"};
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

export default function Setting({
  text,
  type,
  toggleModal,
  handleLogout,
  icon,
  value,
  displayValue,
  farmId,
  form,
  title,
  history
}) {
  if (type === "payout" && !farmId) {
    return null;
  } else;
  return (
    <Row
      style={{ cursor: "pointer" }}
      width="100%"
      alignitems="center"
      onClick={
        type === "logout"
          ? handleLogout
          : type === "payments"
          ? () => history.push("/profile/payments")
          : () => toggleModal(form, title)
      }
    >
      <StyledImage src={icon} />
      <StyledRow border={type !== "logout"}>
        <Label setting>{text}</Label>
        <Row alignitems="center">
          <StyledSettingText>{value && displayValue(value)}</StyledSettingText>
          <FaAngleRight size={22} color="#a3a3a3" />
        </Row>
      </StyledRow>
    </Row>
  );
}
