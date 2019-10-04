import React, { Component } from "react";
import styled from "styled-components";
import marketsplash from "../assets/markets_splash.jpg";
import basketsplash from "../assets/basket_splash.jpg";
import updatessplash from "../assets/updates_splash.jpg";
import orderssplash from "../assets/orders_splash.jpg";
import profilesplash from "../assets/profile_splash.jpg";
import inventorysplash from "../assets/inventory_splash.jpg";
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
    display: none;
  }
`;

export class HeroImage extends Component {
  handleSplash = title => {
    let splash = "";
    switch (title) {
      case "Basket":
        splash = basketsplash;
        break;
      case "Product Updates":
        splash = updatessplash;
        break;
      case "Orders":
        splash = orderssplash;
        break;
      case "Favorites":
        splash = updatessplash;
        break;
      case "Profile":
        splash = profilesplash;
        break;
      case "Inventory":
        splash = inventorysplash;
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
