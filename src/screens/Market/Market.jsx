import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchItems } from "../../store/actions/data";
import { Navigation } from "../../shared-components";
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
  margin: 1em auto 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(275px, 475px));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
  }
`;

class Market extends Component {
  componentDidMount() {
    const { fetchItems } = this.props;
    const marketId = this.props.match.params.id;
    fetchItems(marketId).then(() => {
      this.setState({ isFetchingMarkets: false });
    });
  }
  render() {
    const { markets } = this.props;
    const marketName = this.props.location.state.marketName;
    return (
      <div>
        <Navigation />
        <SplashImage background={`url('${splash}')`}>
          <Icon src={explore} />
          <Title white>{marketName}</Title>
        </SplashImage>
        <Div>
          <Title>Products</Title>
        </Div>
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchItems }
)(Market);
