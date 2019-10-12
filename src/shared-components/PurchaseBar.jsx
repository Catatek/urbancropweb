import React, { Component } from "react";
import styled from "styled-components";
import { Column, Row, Text } from "../theme";
import { AddToBasket } from "./AddToBasket";

const Wrapper = styled(Row)`
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
  background: #fff;
  border-top: 0.5px solid #f1f1f2;
  z-index: 10000;
  justify-content: space-between;
  align-items: center;
`;

const StyledRow = styled(Row)`
  width: 55%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 920px) {
    width: 75%;
  }
  @media (max-width: 780px) {
    width: 95%;
  }
`;

export class PurchaseBar extends Component {
  state = {
    count: 0
  };

  increment = () => {
    let limit = this.props.quantity;
    let count = this.state.count;
    if (count < limit) {
      this.setState(prevState => {
        return {
          count: prevState.count + 1
        };
      });
    }
  };

  decrement = () => {
    let count = this.state.count;
    if (count >= 1) {
      this.setState(prevState => {
        return {
          count: prevState.count - 1
        };
      });
    }
  };

  render() {
    const {
      cost,
      unit,
      formatPrice,
      itemId,
      handleAddItem,
      quantity
    } = this.props;
    const { count } = this.state;
    return (
      <Wrapper>
        <StyledRow>
          <Column>
            <Text smalltitle>{`$${formatPrice(cost)} / per ${unit}`}</Text>
          </Column>
          {quantity > 0 && (
            <AddToBasket
              decrement={this.decrement}
              increment={this.increment}
              count={count}
              handleAddItem={handleAddItem}
              itemId={itemId}
            />
          )}
          {quantity === 0 && <Text>Out of stock</Text>}
        </StyledRow>
      </Wrapper>
    );
  }
}
