import React, { Component } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import logoWhite from "../../assets/logo_white.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(125deg, #f75d19, #f88747);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 275px;
  margin-bottom: 2em;
`;

class Login extends Component {
  render() {
    const { history, location } = this.props;

    return (
      <Wrapper>
        <Logo src={logoWhite} />
        <LoginForm history={history} addToBasketState={location} />
      </Wrapper>
    );
  }
}

export default Login;
