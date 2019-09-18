import React, { Component } from "react";
import styled from "styled-components";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { fetchCart } from "../../store/actions/data";
import { fetchCardsAction } from "../../store/actions/payment";
import Navigation from "../../shared-components/Navigation";
import { HeroImage, BasketItem } from "../../shared-components";
import explore from "../../assets/explore.svg";
import { Title, Text } from "../../theme";
import { getBasket } from "../../store/selectors/data";
import { getActive, getLast4, getBrand } from "../../store/selectors/payment";
import { Link } from "react-router-dom";

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 1.5em;
`;

const Div = styled.div`
  width: 45%;
  margin: 0 auto;
  margin-top: 1em;
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

  handleDeleteItem = id => {
    this.props
      .removeItemFromCart(id)
      .then(() => {
        this.calc();
        this.handleExpandItem(-1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      basket,
      createOrder,
      active,
      navigation,
      last4,
      brand
    } = this.props;
    const {
      total,
      tax,
      fee,
      screenHeight,
      expandedItemIndex,
      isLoadingItems
    } = this.state;
    return (
      <div>
        <Navigation />
        <HeroImage title="Basket" />
        <Div>
          <Title>Basket</Title>

          {basket &&
            basket.map((key, index) => {
              return (
                <BasketItem
                  index={index}
                  key={index}
                  formatPrice={this.formatPrice}
                  quantity={key.get("itemQuantity", 0)}
                  itemName={key.getIn(["item", "itemName"], "")}
                  cost={key.getIn(["item", "cost"], "")}
                  unit={key.getIn(["item", "unit"], "")}
                  type="item"
                  itemId={key.getIn(["item", "itemId"], "")}
                  handleDeleteItem={this.handleDeleteItem}
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
            <Link
              style={{
                marginTop: 16,
                marginBottom: 16,
                alignSelf: "flex-start",
                marginLeft: "auto",
                marginRight: "auto",
                width: "90%"
              }}
              to="/"
            >
              <Text>Click here to add a card before checking out!</Text>
            </Link>
          )}
          {active && (
            <div
              style={{
                marginTop: 16,
                marginBottom: 16,
                alignSelf: "flex-start",
                display: "flex"
              }}
            >
              <Text>Charged to your {brand} card ending in</Text>{" "}
              <Text orange>{last4}</Text>
            </div>
          )}
        </Div>
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
  { fetchCardsAction, fetchCart }
)(Basket);
