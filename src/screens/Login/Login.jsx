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
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Logo = styled.img`
  width: 250px;
  margin-bottom: 2em;
`;

class Login extends Component {
  render() {
    const { history, location } = this.props;

    return (
      <Wrapper background={`url('${loginsplash}')`}>
        <div
          style={{
            marginTop: "5em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Logo src={logoColor} />
          <LoginForm history={history} addToBasketState={location} />
        </div>
      </Wrapper>
    );
  }
}

export default Login;
