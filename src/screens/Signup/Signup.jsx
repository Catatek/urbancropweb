import React, { Component } from "react";
import styled from "styled-components";
import SignupForm from "./SignupForm";
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
  margin-bottom: 2em;
`;

class Signup extends Component {
  render() {
    const { history, location } = this.props;

    return (
      <Wrapper background={`url('${loginsplash}')`}>
        <Logo src={logoColor} />
        <SignupForm history={history} addToBasketState={location} />
      </Wrapper>
    );
  }
}

export default Signup;
