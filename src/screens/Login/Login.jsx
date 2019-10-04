import React, { Component } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import logoColor from "../../assets/logo_color_centered.svg";
import loginsplash from "../../assets/login_splash.png";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Logo = styled.img`
  width: 200px;
  margin-bottom: 1em;
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4em;
  @media (max-width: 780px) {
    margin-bottom: 0;
  }
`;

class Login extends Component {
  render() {
    const { history, location } = this.props;

    return (
      <Wrapper background={`url('${loginsplash}')`}>
        <Div>
          <Logo src={logoColor} />
          <LoginForm history={history} addToBasketState={location} />
        </Div>
      </Wrapper>
    );
  }
}

export default Login;
