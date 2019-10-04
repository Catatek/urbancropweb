import React, { Component } from "react";
import styled from "styled-components";
import { AddToBasket } from "./AddToBasket";
import { Text, Column, Row, Label } from "../theme";
import { addItemToCart } from "../store/actions/data";
import { connect } from "react-redux";
import { POST_ITEM_TO_CART } from "../store/types/data";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
// import { getFarmId } from '../store/selectors/data';
// import { getUserFarmId } from '../store/selectors/auth';
import LazyLoad from "react-lazyload";
import { showMessage } from "../redux_util";

const Wrapper = styled.div`
  width: 100%;
  margin: 8px auto;
  display: flex;
  transition: 500ms;
  @media (min-width: 920px) {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

const StyledImage = styled.img`
  margin-bottom: 10px;
  margin-right: 16px;
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 10px;
`;

const StyledColumn = styled(Column)`
  width: 60%;
`;

const StyledPlaceHolder = styled.div`
  margin-bottom: 10px;
  margin-right: 16px;
  height: 120px;
  width: 120px;
  border-radius: 10px;
`;

const StyledPlaceHolderLines = styled.div`
  height: 20px;
  margin-top: 10px;
  width: 100%;
  border-radius: 10px;
`;

// const StyledRow = styled(Row)`
//   margin: 6px 0;
// `;

const PlaceHolder = () => (
  <Wrapper>
    <StyledPlaceHolder className="shimmer" />
    <StyledColumn>
      <StyledPlaceHolderLines className="shimmer" />
      <StyledPlaceHolderLines className="shimmer" />
      <StyledPlaceHolderLines className="shimmer" />
    </StyledColumn>
  </Wrapper>
);

class Item extends Component {
  state = {
    count: 0
  };

  componentWillReceiveProps(props) {}

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

  handleAddItem = (itemId, count, itemName) => {
    let data = {
      itemQuantity: count
    };
    this.props.addItemToCart(itemId, data).then(action => {
      if (action.type === POST_ITEM_TO_CART.SUCCESS) {
        this.props.showMessage("cart", {
          type: "MESSAGE",
          message: [
            "Success",
            `You successfully added ${itemName} to your basket!`
          ]
        });
        this.setState({ count: 0 });
      } else {
        console.log("error");
      }
    });
  };

  authUser = () => {
    let auth;
    const token = localStorage.getItem("authorization");
    if (token) {
      auth = true;
    } else {
      auth = false;
    }
    return auth;
  };

  // authFarmer = () => {
  //   const { farmId, farmerId } = this.props;
  //   if (farmerId) {
  //     if (farmId === farmerId) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  render() {
    const {
      images,
      cost,
      itemName,
      itemId,
      unit,
      farmName,
      history,
      marketId,
      marketName,
      quantity,
      type
    } = this.props;
    const { count } = this.state;
    const isAuthed = this.authUser();
    return (
      <LazyLoad
        placeholder={<PlaceHolder />}
        height={135}
        throttle={500}
        debounce={250}
        once
      >
        <Wrapper>
          <Link
            to={{
              pathname: `/product/${itemId}`,
              state: { itemName, marketName, marketId }
            }}
          >
            <StyledImage src={images} />
          </Link>
          <StyledColumn>
            <Link to={{ pathname: `/product/${itemId}`, state: { itemName } }}>
              {type !== "inventory" && (
                <Text
                  smalltitle
                >{`${itemName} selected from ${farmName}`}</Text>
              )}
              {type === "inventory" && <Text smalltitle>{`${itemName}`}</Text>}
              {/* <StyledRow> */}
              {/* <FontAwesome
              style={{ marginRight: 4 }}
              size={12}
              name="star"
              color="#fbc513"
            />
            <FontAwesome
              style={{ marginRight: 4 }}
              size={12}
              name="star"
              color="#fbc513"
            />
            <FontAwesome
              style={{ marginRight: 4 }}
              size={12}
              name="star"
              color="#fbc513"
            />
            <FontAwesome
              style={{ marginRight: 4 }}
              size={12}
              name="star"
              color="#fbc513"
            />
            <FontAwesome
              style={{ marginRight: 4 }}
              size={12}
              name="star"
              color="#fbc513"
            /> */}
              {/* </StyledRow> */}

              <Label>{`$${cost} / ${unit}`}</Label>
              {/* {this.authFarmer() ? (
            <div style={{ marginTop: 2 }}>
              <Text>Click to manage your listing</Text>
            </div>
          ) : ( */}
            </Link>
            {type !== "inventory" && quantity > 0 && (
              <AddToBasket
                count={count}
                increment={this.increment}
                decrement={this.decrement}
                isAuthed={isAuthed}
                itemId={itemId}
                handleAddItem={this.handleAddItem}
                history={history}
                marketId={marketId}
                marketName={marketName}
                quantity={quantity}
                itemName={itemName}
              />
            )}
            {type === "inventory" && quantity > 0 && (
              <Text>{`${quantity} in stock`}</Text>
            )}
            {quantity < 0 && <Text>Out of stock</Text>}
            {/* )} */}
          </StyledColumn>
        </Wrapper>
      </LazyLoad>
    );
  }
}
export default connect(
  createStructuredSelector({
    // farmerId: state => getUserFarmId(state)
  }),
  { addItemToCart, showMessage }
)(Item);
