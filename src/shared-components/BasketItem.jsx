import React, { Component } from "react";
import styled from "styled-components";
import { AddToBasket } from "./AddToBasket";
import { Button, Label, Row, Text, Subtitle } from "../theme/index";

const Wrapper = styled.div`
  margin: 0.5em auto;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  border-bottom: ${props => props.borderbottom || "0.5px solid #d5d5d5"};
`;

export class BasketItem extends Component {
  state = {
    isExpand: false,
    expandBoxHeight: 0,
    expandBoxOpacity: 0,
    count: null
  };

  componentDidMount() {
    const { quantity } = this.props;
    this.setState({ count: quantity });
  }

  handleTextFormatting = (unit, quantity) => {
    let str = "";
    if (quantity === 1) {
      str = `${unit}`;
    } else {
      str = `${unit}s`;
    }
    return str.trim();
  };

  handleToggle = () => {
    const { index, handleExpandItem, expandedItemIndex } = this.props;
    if (expandedItemIndex === index) {
      handleExpandItem(-1);
    } else {
      handleExpandItem(index);
    }
  };

  increment = () => {
    this.setState(prevState => {
      return {
        count: prevState.count + 1
      };
    });
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

  handleUpdateItemInCart = itemId => {
    const { count } = this.state;
    this.props.updateItemInCart(itemId, { itemQuantity: count }).then(() => {
      this.props.calc();
      this.props.handleExpandItem(-1);
    });
  };

  render() {
    const {
      quantity,
      unit,
      itemName,
      cost,
      formatPrice,
      type,
      handleDeleteItem,
      itemId,
      navigate,
      expandedItemIndex,
      index
    } = this.props;
    const { expandBoxHeight, expandBoxOpacity, count } = this.state;

    return (
      <Wrapper borderbottom={expandedItemIndex === index && "0px solid #fff"}>
        <Row>
          {type === "item" && (
            <Button circle onClick={this.handleToggle}>
              {/* <Ionicons
                  name={
                    expandedItemIndex === index
                      ? "ios-arrow-up"
                      : "ios-arrow-down"
                  }
                  size={18}
                  color={"#979797"}
                /> */}
            </Button>
          )}
          {type === "item" && (
            <React.Fragment>
              <Text basketitem>{` ${quantity} ${this.handleTextFormatting(
                unit,
                quantity
              )} of `}</Text>{" "}
              <Text
                basketitem
                orange
                onClick={() =>
                  navigate.push(`/product/${itemId}`, { itemName, itemId })
                }
              >
                {` ${itemName} `}
              </Text>{" "}
              <Text basketitem>at </Text>{" "}
              <Text basketitem black>
                {`$${formatPrice(cost)}`}
              </Text>
            </React.Fragment>
          )}
          {type === "orders" && (
            <Text>
              <Text basketitem>{` ${quantity} ${this.handleTextFormatting(
                unit,
                quantity
              )} of`}</Text>

              <Text
                basketitem
                orange
                onClick={() => navigate("Listing", { itemName, itemId })}
              >
                {` ${itemName} `}
              </Text>
              <Text basketitem>at </Text>
              <Text basketitem black>
                {`$${formatPrice(cost)}`}
              </Text>
            </Text>
          )}
          {type === "salesTax" && (
            <Text basketitem>{`${itemName} (${quantity}%)`}</Text>
          )}

          {type === "processingFee" && <Text basketitem>{`${itemName} `}</Text>}
          {type === "total" && <Subtitle>Total</Subtitle>}
        </Row>
        {type === "item" && (
          <Text basketitem black>
            {`$${formatPrice(quantity * cost)}`}
          </Text>
        )}
        {type === "orders" && (
          <Text basketitem black>
            {`$${formatPrice(quantity * cost)}`}
          </Text>
        )}
        {type === "salesTax" && (
          <Text basketitem black>
            {`$${formatPrice(cost)}`}
          </Text>
        )}

        {type === "processingFee" && (
          <Text basketitem black>
            {`$${formatPrice(cost)}`}
          </Text>
        )}
        {type === "total" && <Subtitle>{`$${formatPrice(cost)}`}</Subtitle>}
      </Wrapper>
    );
  }
}
