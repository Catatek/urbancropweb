import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchFarmOrders,
  fetchPastFarmOrders,
  postFullfillOrder
} from "../../store/actions/data";
import { Empty, OrdersCard } from "../../shared-components";
import { Title } from "../../theme";
import { getFarmOrders, getPastFarmOrders } from "../../store/selectors/data";
import { getUserFarmId } from "../../store/selectors/auth";
import cat from "../../assets/cat1.png";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

const Div = styled.div`
  width: 45%;
  margin: 0 auto;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 920px) {
    width: 90%;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 25px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
  }
`;

class FarmOrders extends Component {
  state = {
    isLoadingItems: true
  };
  componentDidMount() {
    const { fetchPastFarmOrders, fetchFarmOrders, farmId } = this.props;
    fetchFarmOrders(farmId);
    fetchPastFarmOrders(farmId).then(() => {
      this.setState({ isLoadingItems: false });
    });
  }

  componentDidUpdate(prevProps) {
    const { fetchPastFarmOrders, fetchFarmOrders, farmId } = this.props;
    if (prevProps.farmId !== farmId) {
      fetchFarmOrders(farmId);
      fetchPastFarmOrders(farmId).then(() => {
        this.setState({ isLoadingItems: false });
      });
    }
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const { farmOrders, pastFarmOrders } = this.props;
    const { isLoadingItems } = this.state;

    return (
      <div>
        {!isLoadingItems &&
          farmOrders.size === 0 &&
          pastFarmOrders.size === 0 && (
            <Empty image={cat} title="You do not have any orders!" />
          )}
        {!isLoadingItems && farmOrders.size > 0 && (
          <Div>
            <Title margin=".5em 0">Current Orders</Title>
            <Grid>
              {farmOrders.map((key, index) => {
                return (
                  <OrdersCard
                    key={index}
                    orderDetails={key.get("orderDetails", "")}
                    status={key.get("status")}
                    history={this.props.history}
                    orderId={key.get("orderId", "")}
                    type="farmer"
                  />
                );
              })}
            </Grid>
          </Div>
        )}
        {!isLoadingItems && pastFarmOrders.size > 0 && (
          <Div>
            <Title margin=".5em 0">Past Orders</Title>
            <Grid>
              {pastFarmOrders.map((key, index) => {
                return (
                  <OrdersCard
                    key={index}
                    orderDetails={key.get("orderDetails", "")}
                    status={key.get("status")}
                    history={this.props.history}
                    orderId={key.get("orderId", "")}
                    type="farmer"
                  />
                );
              })}
            </Grid>
          </Div>
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(
    createStructuredSelector({
      farmId: state => getUserFarmId(state),
      farmOrders: state => getFarmOrders(state),
      pastFarmOrders: state => getPastFarmOrders(state)
    }),
    { fetchFarmOrders, fetchPastFarmOrders, postFullfillOrder }
  )(FarmOrders)
);
