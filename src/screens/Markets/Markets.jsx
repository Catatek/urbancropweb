import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchMarkets } from "../../store/actions/data";
import { Navigation } from "../../shared-components";
import splash from "../../assets/markets_splash.jpg";
import explore from "../../assets/explore.svg";
import { Title } from "../../theme";

const SplashImage = styled.div`
  width: 100%;
  height: 240px;
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

class Markets extends Component {
  componentDidMount() {
    const { fetchMarkets } = this.props;
    const latlong = "33.7382644468085,-84.3446149148936";
    fetchMarkets(latlong).then(() => {
      this.setState({ isFetchingMarkets: false });
    });
  }
  render() {
    return (
      <div>
        <Navigation />
        <SplashImage background={`url('${splash}')`}>
          <Icon src={explore} />
          <Title>Explore Markets</Title>
        </SplashImage>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchMarkets }
)(Markets);
