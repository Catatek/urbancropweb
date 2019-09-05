import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchItem } from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import Item from "../../shared-components/Item";
import splash from "../../assets/markets_splash.jpg";
import explore from "../../assets/explore.svg";
import { Title } from "../../theme";
import { dataSelector } from "../../store/selectors/data";

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
`;

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
`;

const Grid = styled.div`
  display: grid;
  width: 85%;
  grid-gap: 25px;
  margin: 1em auto 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(275px, 400px));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
  }
`;

class Listing extends Component {
  componentDidMount() {
    const { fetchItem } = this.props;
    const itemId = this.props.match.params.id;
    fetchItem(itemId).then(() => {
      this.setState({ isFetchingMarkets: false });
    });
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const marketName = this.props.location.state.itemName;
    const { item } = this.props;
    console.log(item);

    return (
      <div>
        <Navigation />
        <SplashImage background={`url('${splash}')`}>
          <Icon src={explore} />
          <Title white>{marketName}</Title>
        </SplashImage>
        <Div>
          <Title>Listing</Title>
        </Div>
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchItem }
)(Listing);
