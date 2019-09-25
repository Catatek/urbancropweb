import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchConsumerOrder,
  fetchPastConsumerOrders
} from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import { HeroImage, Empty } from "../../shared-components";
import { Title } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import cat from "../../assets/cat1.png";

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
  state = {
    isLoadingItems: true
  };
  componentDidMount() {
    const { fetchConsumerOrder, fetchPastConsumerOrders } = this.props;
    fetchConsumerOrder().then(() => {
      this.setState({ isLoadingItems: false });
    });
    fetchPastConsumerOrders();
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const { consumerOrder, pastConsumerOrders } = this.props;
    const { isLoadingItems } = this.state;

    return (
      <div>
        <Navigation />
        <HeroImage title="Orders" />
        {!isLoadingItems && consumerOrder.size === 0 && (
          <Empty image={cat} title="You do not have any current orders!" />
        )}
        {isLoadingItems && consumerOrder.size > 0 && (
          <Div>
            <Title>Orders</Title>
          </Div>
        )}
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchConsumerOrder, fetchPastConsumerOrders }
)(Orders);
