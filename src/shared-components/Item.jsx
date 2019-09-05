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

const Wrapper = styled.div`
  width: 100%;
  margin: 8px auto;
  display: flex;
  transition: 500ms;
  @media (min-width: 920px) {
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const StyledImage = styled.img`
  margin-bottom: 10px;
  margin-right: 16px;
  height: 120px;
  width: 120px;
  border-radius: 10px;
`;

const StyledColumn = styled(Column)`
  width: 60%;
`;

const StyledRow = styled(Row)`
  margin: 6px 0;
`;

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

  handleAddItem = (itemId, count) => {
    let data = {
      itemQuantity: count
    };
    this.props.addItemToCart(itemId, data).then(action => {
      if (action.type === POST_ITEM_TO_CART.SUCCESS) {
        this.setState({ count: 0 });
      } else {
        console.log("error");
      }
    });
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
      navigation,
      cost,
      itemName,
      itemId,
      unit,
      farmName
    } = this.props;

    const { count } = this.state;
    return (
      <Wrapper>
        <Link to={{ pathname: `/product/${itemId}`, state: { itemName } }}>
          <StyledImage src={images} />
        </Link>
        <StyledColumn>
          <Link to={{ pathname: `/product/${itemId}`, state: { itemName } }}>
            <Text smalltitle>{`${itemName} selected from ${farmName}`}</Text>
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
          <AddToBasket
            count={count}
            increment={this.increment}
            decrement={this.decrement}
            itemId={itemId}
            handleAddItem={this.handleAddItem}
          />
          {/* )} */}
        </StyledColumn>
      </Wrapper>
    );
  }
}
export default connect(
  createStructuredSelector({
    // farmerId: state => getUserFarmId(state)
  }),
  { addItemToCart }
)(Item);
