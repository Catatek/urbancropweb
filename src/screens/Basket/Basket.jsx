import React, { Component } from "react";
import styled from "styled-components";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  fetchCart,
  createOrder,
  updateItemInCart,
  removeItemFromCart
} from "../../store/actions/data";
import { fetchCardsAction } from "../../store/actions/payment";
import Navigation from "../../shared-components/Navigation";
import { HeroImage, BasketItem, Empty } from "../../shared-components";
import { Title, Text, Button } from "../../theme";
import { getBasket } from "../../store/selectors/data";
import { getActive, getLast4, getBrand } from "../../store/selectors/payment";
import { Link } from "react-router-dom";
import dog from "../../assets/dog1.png";

const Div = styled.div`
  width: 45%;
  margin: 2em auto;
  @media (max-width: 920px) {
    width: 75%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;

class Basket extends Component {
  state = {
    tax: 0,
    fee: 0,
    total: 0,
    screenHeight: 0,
    expandedItemIndex: -1,
    isLoadingItems: true
  };

  componentDidMount() {
    this.props.fetchCart().then(() => {
      this.props.fetchCardsAction();
      this.setState({ isLoadingItems: false });
      this.calc();
    });
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  calcQuantity = quantity => {
    if (quantity === 1) {
      return `${quantity} item`;
    } else {
      return `${quantity} items`;
    }
  };

  calc = () => {
    const { basket } = this.props;
    let total = 0;
    let sub = 0;
    let tax = 0;
    let fee = 0;
    basket.forEach(key => {
      let quantity = key.get("itemQuantity", 0);
      let cost = key.getIn(["item", "cost"], 0);
      let itemsCost = quantity * cost;
      sub += itemsCost;
      tax = sub * 0.07;
      fee = sub * 0.35;
      total = sub + tax + fee;
    });
    this.setState(() => {
      return {
        total,
        tax,
        fee
      };
    });
  };

  handleExpandItem = index => {
    this.setState({ expandedItemIndex: index });
  };

  render() {
    const {
      basket,
      createOrder,
      active,
      navigation,
      last4,
      brand,
      removeItemFromCart
    } = this.props;
    const {
      total,
      tax,
      fee,
      screenHeight,
      expandedItemIndex,
      isLoadingItems
    } = this.state;
    const basketCount = this.calcQuantity(basket.size);

    return (
      <div>
        <Navigation />
        <HeroImage title="Basket" />
        {!isLoadingItems && basket.size === 0 && (
          <Empty image={dog} title="Your basket is empty!" />
        )}
        {!isLoadingItems && basket.size > 0 && (
          <Div>
            <Title margin=".5em 0 .25em 0">Basket</Title>
            <Text margin=".25em 0 2em 0">{basketCount}</Text>
            {basket &&
              basket.map((key, index) => {
                return (
                  <BasketItem
                    index={index}
                    key={index}
                    formatPrice={this.formatPrice}
                    quantity={key.get("itemQuantity", 0)}
                    totalItemQuantity={key.getIn(["item", "quantity"], 0)}
                    itemName={key.getIn(["item", "itemName"], "")}
                    cost={key.getIn(["item", "cost"], "")}
                    unit={key.getIn(["item", "unit"], "")}
                    type="item"
                    itemId={key.getIn(["item", "itemId"], "")}
                    removeItemFromCart={this.props.removeItemFromCart}
                    navigate={this.props.history}
                    expandedItemIndex={expandedItemIndex}
                    handleExpandItem={this.handleExpandItem}
                    updateItemInCart={this.props.updateItemInCart}
                    calc={this.calc}
                  />
                );
              })}
            <BasketItem
              itemName="State tax"
              quantity={0.7}
              cost={tax}
              type="salesTax"
              formatPrice={this.formatPrice}
              index={null}
            />
            <BasketItem
              itemName="Processing fee"
              cost={fee}
              type="processingFee"
              formatPrice={this.formatPrice}
              index={null}
            />
            <BasketItem
              item="Total"
              cost={total}
              type="total"
              formatPrice={this.formatPrice}
              index={null}
            />
            {!active && (
              <div
                style={{
                  marginTop: 16,
                  marginBottom: 16,
                  alignSelf: "flex-start",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                <Link to="/profile/payments">
                  <Text orange>
                    Click here to add a card before checking out!
                  </Text>
                </Link>
              </div>
            )}
            {active && (
              <div>
                <div
                  style={{
                    marginBottom: "1em",
                    alignSelf: "flex-start",
                    display: "flex"
                  }}
                >
                  <Text>Charged to your {brand} card ending in</Text>&nbsp;
                  <Link to="/profile/payments">
                    <Text orange>{last4}</Text>
                  </Link>
                </div>
              </div>
            )}
            <Button
              onClick={createOrder}
              checkout
              active={active}
              disabled={!active}
            >
              Checkout
            </Button>
          </Div>
        )}
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    basket: state => getBasket(state),
    active: state => getActive(state),
    last4: state => getLast4(state),
    brand: state => getBrand(state)
  }),
  {
    fetchCardsAction,
    fetchCart,
    createOrder,
    updateItemInCart,
    removeItemFromCart
  }
)(Basket);
