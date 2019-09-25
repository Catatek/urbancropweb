import React from "react";
import styled from "styled-components";
import { Text } from "../theme";

const StyledImage = styled.img`
  width: 200px;
  height: 167px;
  margin-bottom: 16px;
`;

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4em;
`;

export function Empty({ title, image }) {
  return (
    <Wrapper>
      <StyledImage src={image} />
      <Text smalltitle>{title}</Text>
    </Wrapper>
  );
}
