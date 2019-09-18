import React, { Component } from "react";
import styled from "styled-components";
import marketsplash from "../assets/markets_splash.jpg";
import basketsplash from "../assets/basket_splash.jpg";
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

export class HeroImage extends Component {
  handleSplash = title => {
    let splash = "";
    switch (title) {
      case "Basket":
        splash = basketsplash;
        break;
      default:
        splash = marketsplash;
    }
    return splash;
  };
  render() {
    const { title, icon } = this.props;
    const splashImage = this.handleSplash(title);
    return (
      <SplashImage background={`url('${splashImage}')`}>
        {icon && <Icon src={explore} />}
        <Title white>{title}</Title>
      </SplashImage>
    );
  }
}
