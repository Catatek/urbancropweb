import React, { Component } from "react";
import styled from "styled-components";
import { AddToBasket } from "./AddToBasket";
import { Button, Row, Text, Subtitle } from "../theme/index";
import { FaAngleDown, FaAngleUp, FaTrashAlt } from "react-icons/fa";

const Wrapper = styled.div`
  margin: 0.5em auto;
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 55px;
  border-bottom: ${props => props.borderbottom || "0.5px solid #d5d5d5"};
`;

const ExpandWrapper = styled.div`
  transition: 500ms;
  border: solid 1px #e3e3e3;
  height: auto;
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const StyledFaTrashAlt = styled(FaTrashAlt)`
cursor: pointer;
transition 500ms;
color: #979797;
&:hover {
  color: red;
}
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
      this.setState({ expandBoxHeight: 0, expandBoxOpacity: 0 });
      handleExpandItem(-1);
    } else {
      this.setState({ expandBoxHeight: 75, expandBoxOpacity: 1 });
      handleExpandItem(index);
    }
  };

  increment = () => {
    let limit = this.props.totalItemQuantity;
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
    if (count >= 2) {
      this.setState(prevState => {
        return {
          count: prevState.count - 1
        };
      });
    }
  };

  handleUpdateItemInCart = itemId => {
    const { count } = this.state;
    const { updateItemInCart, calc, handleExpandItem } = this.props;
    updateItemInCart(itemId, { itemQuantity: count })
      .then(() => {
        calc();
        this.setState({ expandBoxHeight: 0, expandBoxOpacity: 0 });
        handleExpandItem(-1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDeleteItem = id => {
    const { removeItemFromCart, calc, handleExpandItem } = this.props;
    removeItemFromCart(id)
      .then(() => {
        calc();
        this.setState({ expandBoxHeight: 0, expandBoxOpacity: 0 });
        handleExpandItem(-1);
      })
      .catch(err => {
        console.log(err);
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
      removeItemFromCart,
      itemId,
      navigate,
      expandedItemIndex,
      index
    } = this.props;
    const { expandBoxHeight, expandBoxOpacity, count } = this.state;

    return (
      <React.Fragment>
        <Wrapper
          borderbottom={
            expandedItemIndex === index
              ? ".5px solid transparent"
              : type === "total" && ".5px solid transparent"
          }
        >
          <Row>
            {type === "item" && (
              <Button circle onClick={this.handleToggle} basketitem>
                {expandedItemIndex === index ? (
                  <FaAngleUp color="#979797" />
                ) : (
                  <FaAngleDown color="#979797" />
                )}
              </Button>
            )}
            {type === "item" && (
              <Row>
                <Text basketitem>
                  {` ${quantity} ${this.handleTextFormatting(
                    unit,
                    quantity
                  )} of`}
                </Text>
                &nbsp;
                <Text
                  basketitem
                  orange
                  onClick={() =>
                    navigate.push(`/product/${itemId}`, { itemName, itemId })
                  }
                >
                  {`${itemName}`}
                </Text>
                &nbsp;
                <Text basketitem>at </Text>&nbsp;
                <Text basketitem black>
                  {`$${formatPrice(cost)}`}
                </Text>
              </Row>
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

            {type === "processingFee" && (
              <Text basketitem>{`${itemName} `}</Text>
            )}
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

        <ExpandWrapper
          style={{
            height: expandBoxHeight,
            opacity: expandBoxOpacity
          }}
        >
          {expandedItemIndex === index ? (
            <Row
              style={{
                width: "90%",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "space-between",
                display: "flex"
              }}
            >
              <AddToBasket
                count={count}
                decrement={this.decrement}
                increment={this.increment}
                type="basket"
              />
              <Row alignitems="center">
                <Button
                  style={{ marginLeft: 6, marginRight: 16 }}
                  onClick={() => this.handleUpdateItemInCart(itemId)}
                >
                  Update
                </Button>
                <StyledFaTrashAlt
                  size="1.25em"
                  onClick={() => removeItemFromCart(itemId)}
                />
              </Row>
            </Row>
          ) : null}
        </ExpandWrapper>
      </React.Fragment>
    );
  }
}
