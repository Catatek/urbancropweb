import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchAllMarketOrders } from "../../store/actions/data";
import { Empty, OrdersCard } from "../../shared-components";
import { Title } from "../../theme";
import {
  getFarmOrders,
  getPastFarmOrders,
  getMarketOrders
} from "../../store/selectors/data";
import { getUserFarmId } from "../../store/selectors/auth";
import cat from "../../assets/cat1.png";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { Map } from "immutable";

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

class MarketOrders extends Component {
  state = {
    isLoadingItems: true
  };
  componentDidMount() {
    const { fetchAllMarketOrders } = this.props;
    const marketId = "market-D3EC";
    fetchAllMarketOrders(marketId).then(() => {
      this.setState({ isLoadingItems: false });
    });
  }

  //   componentDidUpdate(prevProps) {
  //     const { fetchAllMarketOrders, farmId } = this.props;
  //     if (prevProps.farmId !== farmId) {
  //       fetchFarmOrders(farmId);
  //       fetchPastFarmOrders(farmId).then(() => {
  //         this.setState({ isLoadingItems: false });
  //       });
  //     }
  //   }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  handleSubmit = orderId => {
    const {
      postFullfillOrder,
      fetchFarmOrders,
      fetchPastFarmOrders,
      farmId
    } = this.props;
    postFullfillOrder(orderId, {
      farmId,
      status: "fulfilled"
    }).then(() => {
      fetchFarmOrders(farmId);
      fetchPastFarmOrders(farmId);
    });
  };

  render() {
    const { marketOrders } = this.props;
    const { isLoadingItems } = this.state;

    return (
      <div>
        {!isLoadingItems && marketOrders.size === 0 && (
          <Empty image={cat} title="You do not have any orders!" />
        )}
        {!isLoadingItems && marketOrders.size > 0 && (
          <Div>
            <Title margin=".5em 0">Market Orders</Title>
            <Grid>
              {marketOrders.map((key, index) => {
                return (
                  <OrdersCard
                    key={index}
                    orderDetails={key.get("orderDetails", Map())}
                    status={key.get("status")}
                    history={this.props.history}
                    orderId={key.get("orderId", "")}
                    type="farmer"
                    handleSubmit={this.handleSubmit}
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
      marketOrders: state => getMarketOrders(state)
    }),
    { fetchAllMarketOrders }
  )(MarketOrders)
);
