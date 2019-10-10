import React from "react";
import styled from "styled-components";
import { Text, Row, Button } from "../theme";

const Wrapper = styled(Row)`
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
  background: #fff;
  border-top: 0.5px solid #f1f1f2;
  z-index: 10000;
  justify-content: space-between;
  align-items: center;
`;

const StyledRow = styled(Row)`
  width: 55%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 920px) {
    width: 75%;
  }
  @media (max-width: 780px) {
    width: 95%;
  }
`;

export function FarmerBar({
  navigate,
  type,
  handleSubmitItem,
  products,
  farmId
}) {
  return (
    <Wrapper>
      <StyledRow>
        <Text smalltitle>Product Preview</Text>

        <Button
          onClick={() =>
            type === "preview"
              ? handleSubmitItem(products, farmId)
              : navigate("EditItemForm")
          }
        >
          {type === "preview" ? "Save Product(s)" : "Edit Details"}
        </Button>
      </StyledRow>
    </Wrapper>
  );
}