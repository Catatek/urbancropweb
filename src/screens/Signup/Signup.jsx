import React, { Component } from "react";
import styled from "styled-components";
import SignupForm from "./SignupForm";
import logoWhite from "../../assets/logo_white.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(125deg, #f75d19, #f88747);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Logo = styled.img`
  width: 275px;
  margin-bottom: 1em;
`;

class Signup extends Component {
  render() {
    const { history, location } = this.props;

    return (
      <Wrapper>
        <Logo src={logoWhite} />
        <SignupForm history={history} addToBasketState={location} />
      </Wrapper>
    );
  }
}

export default Signup;
