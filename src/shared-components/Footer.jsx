import React, { Component } from "react";
import styled from "styled-components";
import { Text, Column, Row } from "../theme";
import Logo from "../assets/logo_white.svg";
import { DiAndroid, DiApple } from "react-icons/di";
import { Helmet } from "react-helmet";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Wrapper = styled.div`
  width: 100%;
  height: ${props => (props.top ? "175px" : "45px")};
  padding-top: ${props => (props.top ? "3em" : 0)};
  align-items: ${props => (props.top ? "flex-start" : "center")};
  display: ${props => (props.top ? "block" : "flex")};
  background: ${props => (props.top ? "#8bc53c" : "#3AAA35")};
  @media (max-width: 920px) {
    height: 100%;
  }
  @media (max-width: 500px) {
    display: ${props => (props.top ? "block" : "none")};
    height: ${props => (props.top ? "250px" : "")};
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
    padding: 2em 0;
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
    width: 85%;
  }
`;

const StyledIconRow = styled(Row)`
  margin-top: 2em;
  @media (max-width: 920px) {
    margin-top: 1em;
    justify-content: center;
  }
`;

const StyledLogo = styled.img`
  width: 250px;
`;

export class Footer extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <script>
            {`
      (function() {
      
        var DRIFT_CHAT_SELECTOR = ".drift-open-chat";
        
        function ready(fn) {
          if (document.readyState != "loading") {
            fn();
          } else if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", fn);
          } else {
            document.attachEvent("onreadystatechange", function() {
              if (document.readyState != "loading") fn();
            });
          }
        }
        
        function forEachElement(selector, fn) {
          var elements = document.querySelectorAll(selector);
          for (var i = 0; i < elements.length; i++) fn(elements[i], i);
        }
        function openSidebar(driftApi, event) {
          event.preventDefault();
          driftApi.sidebar.open();
          return false;
        }
        ready(function() {
          drift.on("ready", function(api) {
            var handleClick = openSidebar.bind(this, api);
            forEachElement(DRIFT_CHAT_SELECTOR, function(el) {
              el.addEventListener("click", handleClick);
            });
          });
        });
      })();
    `}
          </script>
        </Helmet>
        <Wrapper top>
          <Div>
            <div>
              <StyledLogo src={Logo} />
              <StyledIconRow>
                <a href="https://www.facebook.com/urbancrop.us/">
                  <FaFacebook
                    color="#fff"
                    size="1.25em"
                    style={{ marginRight: "1em" }}
                  />
                </a>
                <a href="https://www.instagram.com/urbancropus">
                  <FaInstagram color="#fff" size="1.25em" />
                </a>
              </StyledIconRow>
            </div>
            <StyledRow>
              <StyledColumn>
                <Text white bold>
                  UrbanCrop
                </Text>
                <a href="https://urbancrop.io/privacy">
                  <Text white>Privacy policy</Text>
                </a>
              </StyledColumn>
              <StyledColumn>
                <Text white bold>
                  Need Help?
                </Text>
                <a style={{ cursor: "pointer" }} className="drift-open-chat">
                  <Text white>Contact us</Text>
                </a>
              </StyledColumn>
              <StyledColumn>
                <Text white bold>
                  Get the apps
                </Text>
                <Row alignitems="center">
                  <DiApple
                    color="#fff"
                    size="1.5em"
                    style={{ marginRight: ".5em" }}
                  />
                  <DiAndroid color="#fff" size="1.25em" />
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
