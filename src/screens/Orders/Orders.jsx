import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchConsumerOrder,
  fetchPastConsumerOrders
} from "../../store/actions/data";
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

class Orders extends Component {
  componentDidMount() {
    const { fetchConsumerOrder, fetchPastConsumerOrders } = this.props;
    fetchConsumerOrder();
    fetchPastConsumerOrders();
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const { consumerOrder, pastConsumerOrders } = this.props;
    console.log(consumerOrder, pastConsumerOrders);

    return (
      <div>
        <Navigation />
        <SplashImage background={`url('${splash}')`}>
          <Title white>Orders</Title>
        </SplashImage>
        <Div>
          <Title>Orders</Title>
        </Div>
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchConsumerOrder, fetchPastConsumerOrders }
)(Orders);
