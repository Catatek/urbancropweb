import React, { Component } from "react";
import styled from "styled-components";
import { Text, Column, Row } from "../theme";
import Logo from "../assets/logo_white.svg";
import { DiAndroid, DiApple } from "react-icons/di";

const Wrapper = styled.div`
  width: 100%;
  height: ${props => (props.top ? "175px" : "45px")};
  padding-top: ${props => (props.top ? "3em" : 0)};
  align-items: ${props => (props.top ? "flex-start" : "center")};
  display: ${props => (props.top ? "block" : "flex")};
  background: ${props => (props.top ? "#8bc53c" : "#3AAA35")};
  @media (max-width: 500px) {
    display: ${props => (props.top ? "block" : "none")};
  }
`;

const Div = styled.div`
  margin: 0 auto;
  justify-content: space-between;
  display: flex;
  width: 75%;
  @media (max-width: 920px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  @media (max-width: 500px) {
    justify-content: center;
  }
`;

const StyledColumn = styled(Column)`
  margin-right: 3em;
  @media (max-width: 920px) {
    margin-right: 0;
  }
`;

const StyledRow = styled(Row)`
  @media (max-width: 920px) {
    width: 50%;
    margin-top: 2em;
    justify-content: space-between;
  }
  @media (max-width: 780px) {
    width: 75%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const StyledLogo = styled.img`
  width: 275px;
`;

export class Footer extends Component {
  render() {
    return (
      <div>
        <Wrapper top>
          <Div>
            <StyledLogo src={Logo} />
            <StyledRow>
              <StyledColumn>
                <Text white bold>
                  UrbanCrop
                </Text>
                <Text white>Blog</Text>
                <Text white>Team</Text>
              </StyledColumn>
              <StyledColumn>
                <Text white bold>
                  Need Help?
                </Text>
                <Text white>Contact us</Text>
              </StyledColumn>
              <StyledColumn>
                <Text white bold>
                  Get the apps
                </Text>
                <Row alignitems="center">
                  <DiApple
                    color="#fff"
                    size="1.75em"
                    style={{ marginRight: ".5em" }}
                  />
                  <DiAndroid color="#fff" size="1.5em" />
                </Row>
              </StyledColumn>
            </StyledRow>
          </Div>
        </Wrapper>
        <Wrapper>
          <Div>
            <Text white bold>
              UrbanCrop 2019 | All rights reserved | Made with love in Georgia
            </Text>
          </Div>
        </Wrapper>
      </div>
    );
  }
}
