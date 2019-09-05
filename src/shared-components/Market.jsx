import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text } from "../theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: 500ms;
  border-radius: 8px;
  @media (min-width: 920px) {
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  background: ${props => props.background};
  object-fit: contain;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

export function Market({ img, id, marketName }) {
  return (
    <Link
      to={{
        pathname: `/market/${id}`,
        state: { marketName }
      }}
    >
      <Wrapper>
        <Image src={img} />
        <Text smalltitle>{marketName}</Text>
      </Wrapper>
    </Link>
  );
}
