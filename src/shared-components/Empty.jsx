import React from "react";
import styled from "styled-components";
import { Text, Button } from "../theme";
import { Link } from "react-router-dom";

const StyledImage = styled.img`
  width: 200px;
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

export function Empty({ title, image, button }) {
  return (
    <Wrapper>
      <StyledImage src={image} />
      <Text smalltitle>{title}</Text>
      {button && (
        <Link to="/orders">
          <Button orderActions orange style={{ marginTop: ".75em" }}>
            View orders
          </Button>
        </Link>
      )}
    </Wrapper>
  );
}
