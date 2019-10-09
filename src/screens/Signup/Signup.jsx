import React, { Component } from "react";
import styled from "styled-components";
import SignupForm from "./SignupForm";
import logoColor from "../../assets/logo_color_centered.svg";
import loginsplash from "../../assets/login_splash.png";

const Wrapper = styled.div`
  width: 100%;
  max-height: -webkit-fill-available;
  min-height: -webkit-fill-available;
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
  @media (max-width: 500px) {
    width: 150px;
  }
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
