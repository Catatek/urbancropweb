import React, { Component } from "react";
import styled from "styled-components";
import { Text, Row, Column, Button } from "../theme";
import { OrderItem } from "./OrderItem";
import { BasketItem } from "./BasketItem";
import FulfilledIcon from "../assets/fulfilledIndicator.png";
import PendingIcon from "../assets/pendingIndicator.png";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  border-radius: 4px;
  margin: 0 auto;
  padding: 0.75em 0;
  box-shadow: ${props =>
    props.boxshadow &&
    " 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"};
`;

const Container = styled.div`
  width: ${props => props.width || "85%"};
  margin: 0 auto;
`;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  padding: 8px;
  width: 85%;
  margin: 0 auto;
  margin-top: 16px;
  border-bottom-width: 0.5px;
  border-bottom-color: #d5d5d5;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const StyledRow = styled(Row)`
  margin: 4px auto 16px auto;
`;

function Status({ orderId, status, date }) {
  const formattedOrder = orderId.split("-")[1];
  return (
    <StatusWrapper>
      <Row alignitems="flex-start">
        <Icon src={status === "pending" ? PendingIcon : FulfilledIcon} />
        <Column>
          <Text margin="0" smalltitle>{`Order ${status}`}</Text>
          <Text>{date}</Text>
        </Column>
      </Row>
      <Text smalltitle>{`Order #${formattedOrder}`}</Text>
    </StatusWrapper>
  );
}

export class OrdersCard extends Component {
  state = {
    total: 0,
    sub: 0
  };

  componentDidMount() {
    this.calc();
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  calc = () => {
    const { orderDetails } = this.props;
    let total = 0;
    let sub = 0;
    let tax = 0;
    let fee = 0;

    orderDetails.forEach(key => {
      let quantity = key.get("itemQuantity", 0);
      let cost = key.get("itemCost", 0);
      let itemsCost = quantity * cost;
      sub += itemsCost;
      tax = 0;
      fee = sub * 0.1;
      total = sub + tax + fee;
    });

    this.setState(() => {
      return {
        total,
        tax,
        fee,
        sub
      };
    });
  };

  render() {
    const {
      orderDetails,
      status,
      history,
      orderId,
      type,
      currentOrder,
      handleSubmit
    } = this.props;

    const { total, fee, sub } = this.state;
    return (
      <Wrapper boxshadow={!currentOrder}>
        {!currentOrder && (
          <Status status={status} date="April 22, 2019" orderId={orderId} />
        )}
        {currentOrder && <Text smalltitle>Details</Text>}
        <Container width={currentOrder && "95%"}>
          {orderDetails &&
            orderDetails.map((key, index) => {
              return (
                <OrderItem
                  key={index}
                  index={index}
                  formatPrice={this.formatPrice}
                  quantity={key && key.get("itemQuantity", 0)}
                  itemName={key.get("itemName", "")}
                  cost={key.get("itemCost", "")}
                  unit={key.get("unit", "")}
                  type="orders"
                  itemId={key.get("itemId", "")}
                  expandedItemIndex={-1}
                  history={history}
                />
              );
            })}
          {type === "consumer" && (
            <React.Fragment>
              {/* <BasketItem
                itemName="State tax"
                quantity={0.7}
                cost={tax}
                type="salesTax"
                formatPrice={this.formatPrice}
                index={null}
              /> */}
              <BasketItem
                itemName="Processing fee"
                cost={fee}
                type="processingFee"
                formatPrice={this.formatPrice}
                index={null}
              />
            </React.Fragment>
          )}
          <OrderItem
            item="Total"
            cost={type === "farmer" ? sub : total}
            type="total"
            formatPrice={this.formatPrice}
          />
          <StyledRow>
            {type === "consumer" && (
              <Button orderActions style={{ marginRight: ".75em" }}>
                Email Receipt
              </Button>
            )}

            {status === "pending" && type === "farmer" && (
              <Button
                onClick={() => handleSubmit(orderId)}
                orderActions
                orange
                style={{ marginRight: ".75em" }}
              >
                Fulfill Order
              </Button>
            )}
            {type === "farmer" && (
              <Button
                orderActions
                onClick={() =>
                  history.push(`/help/${orderId}`, { orderId, role: "farmer" })
                }
              >
                Help
              </Button>
            )}

            {type === "consumer" && status === "completed" && (
              <Button
                orderActions
                onClick={() =>
                  history.push(`/help/${orderId}`, {
                    orderId,
                    role: "consumer"
                  })
                }
              >
                Help
              </Button>
            )}
          </StyledRow>
        </Container>
      </Wrapper>
    );
  }
}
