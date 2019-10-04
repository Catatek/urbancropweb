import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchConsumerOrder,
  fetchPastConsumerOrders
} from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import { HeroImage, Empty, OrdersCard } from "../../shared-components";
import { Title, Text, Column } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import cat from "../../assets/cat1.png";
import { IoIosCheckmarkCircle } from "react-icons/io";

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
  margin: 1em auto 0 auto;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  text-align: center;
  justify-content: space-between;
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`;

const StyledColumn = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

function Status({ title, date, status, handleStatus, type }) {
  const formattedDate = date.split(",")[1].trim();
  return (
    <StatusWrapper>
      <StyledColumn>
        <IoIosCheckmarkCircle
          size={24}
          color={
            handleStatus(status, type)[0] === "#8bc53c" ? "#8bc53c" : "#f1f1f2"
          }
          style={{ marginRight: 6 }}
        />
        {/* <div
          style={{
            width: 50,
            height: 2,
            backgroundColor: handleStatus(status, type)[0]
          }}
        />
        <div
          style={{
            width: 50,
            height: 2,
            backgroundColor: handleStatus(status, type)[1]
          }}
        /> */}
      </StyledColumn>
      <Column>
        <Text
          smalltitle
          style={{
            color: status ? "#000" : "#a3a3a3",
            marginTop: 0,
            marginBottom: 0
          }}
        >
          {status ? `${title}` : `${title} (pending)`}
        </Text>
        {status && <Text>{formattedDate}</Text>}
      </Column>
    </StatusWrapper>
  );
}

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

  handleStatus = (status, type) => {
    let colors = [];
    if (type === "placedOrder") {
      if (status === "pending") {
        colors = ["#8bc53c", "#f1f1f2"];
      } else if (status === "fulfilled") {
        colors = ["#8bc53c", "#8bc53c"];
      } else if (status === "pickup") {
        colors = ["#8bc53c", "#8bc53c"];
      }
    } else if (type === "orderFulfilled") {
      if (status === "fulfilled") {
        colors = ["#8bc53c", "#f1f1f2"];
      } else if (status === "pickup") {
        colors = ["#8bc53c", "#8bc53c"];
      }
    } else if (type === "readyForPickup") {
      if (status === "pickup") {
        colors = ["#8bc53c", "#8bc53c"];
      }
    }
    return colors;
  };

  render() {
    const { consumerOrder, pastConsumerOrders } = this.props;
    const { isLoadingItems } = this.state;
    const formattedOrder =
      consumerOrder && consumerOrder.getIn([0, "orderId"], "").split("-")[1];

    return (
      <div>
        <Navigation />
        <HeroImage title="Orders" />
        {!isLoadingItems &&
          consumerOrder.size === 0 &&
          pastConsumerOrders.size === 0 && (
            <Empty image={cat} title="You do not have any current orders!" />
          )}
        {!isLoadingItems && consumerOrder.size > 0 && (
          <Div>
            <Title>{`Order #${formattedOrder}`}</Title>
            <Text smalltitle>Status</Text>
            <Container>
              <Status
                title="Placed order"
                type="placedOrder"
                handleStatus={this.handleStatus}
                date={consumerOrder.getIn([0, "placedDate"])}
                status={consumerOrder.getIn([0, "status"], "pending")}
              />
              <Status
                title="Order fulfilled"
                type="orderFulfilled"
                handleStatus={this.handleStatus}
                date={consumerOrder.getIn([0, "placedDate"])}
                status={consumerOrder.getIn([0, "status"], "pending")}
              />
              <Status
                title="Pickup order"
                type="readyForPickup"
                handleStatus={this.handleStatus}
                date={consumerOrder.getIn([0, "placedDate"])}
                status={consumerOrder.getIn([0, "status"], "pending")}
              />
            </Container>
            <OrdersCard
              orderDetails={consumerOrder.getIn([0, "orderDetails"], "")}
              status={consumerOrder.get("status")}
              navigation={this.props.navigation}
              orderId={consumerOrder.get("orderId", "")}
              type="consumer"
              currentOrder
            />
          </Div>
        )}
        {!isLoadingItems && pastConsumerOrders.size > 0 && (
          <Div>
            <Title margin=".5em 0 0 0">Past Orders</Title>
            <Grid>
              {pastConsumerOrders.map((key, index) => {
                return (
                  <OrdersCard
                    orderDetails={key.get("orderDetails", "")}
                    status={key.get("status")}
                    navigation={this.props.navigation}
                    orderId={key.get("orderId", "")}
                    type="consumer"
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

export default connect(
  dataSelector,
  { fetchConsumerOrder, fetchPastConsumerOrders }
)(Orders);
