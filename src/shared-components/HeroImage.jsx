import React from "react";
import styled from "styled-components";
import splash from "../assets/markets_splash.jpg";
import explore from "../assets/explore.svg";
import { Title } from "../theme";

const SplashImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.background};
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 1.5em;
  @media (max-width: 620px) {
    width: 18px;
    height: 18px;
  }
`;

export const HeroImage = ({ title, icon }) => (
  <SplashImage background={`url('${splash}')`}>
    {icon && <Icon src={explore} />}
    <Title white>{title}</Title>
  </SplashImage>
);
