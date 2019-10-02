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
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 0.5em;
`;

export function Market({
  img,
  id,
  marketName,
  lat,
  lng,
  userLat,
  userLng,
  calcDistance
}) {
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
        {/* <Text margin="0">{`${calcDistance(
          userLat,
          userLng,
          lng,
          lat
        )} miles away`}</Text> */}
      </Wrapper>
    </Link>
  );
}
