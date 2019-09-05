import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import logo from "../assets/logo.svg";
import basket from "../assets/basket.svg";
import { Nav, Button } from "../theme";
import { fetchCart } from "../store/actions/data";

import { createStructuredSelector } from "reselect";

const Wrapper = styled.div`
  background: #fff;
  height: 80px;
  margin: 0 auto;
  max-width: 85%;
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 920px) {
    width: 95%;
    height: auto;
    flex-direction: column;
    justify-content: center;
    padding: 2em 0 1em 0;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 920px) {
    margin-top: 2em;
    width: 100%;
  }
`;

const Image = styled.img`
  width: 250px;
`;

const Icon = styled.img`
  width: 23px;
  height: 21px;
`;

class Navigation extends Component {
  componentDidMount() {
    const { fetchCart } = this.props;
    fetchCart();
  }
  render() {
    return (
      <Wrapper>
        <Image src={logo} />

        <Div>
          <Nav to="/">Explore</Nav>
          <Nav to="/vendors">Farm</Nav>
          <Nav to="/vendors">Orders</Nav>
          <Nav to="/markets">Profile</Nav>
          <Button nav>Sign in</Button>
          <Icon src={basket} />
        </Div>
      </Wrapper>
    );
  }
}

export default connect(
  createStructuredSelector({
    // farmerId: state => getUserFarmId(state)
  }),
  { fetchCart }
)(Navigation);
