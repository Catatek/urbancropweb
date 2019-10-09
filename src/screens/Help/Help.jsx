import React, { Component } from "react";
import styled from "styled-components";
import { HeroImage } from "../../shared-components";
import Navigation from "../../shared-components/Navigation";
import { Title, Text, Row, Label, Column } from "../../theme";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Name from "../../assets/name.png";
import Email from "../../assets/email.png";
import { Helmet } from "react-helmet";

const Div = styled.div`
  width: 45%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  @media (max-width: 920px) {
    width: 90%;
    margin-top: 2em;
  }
`;

const StyledRow = styled(Row)`
  border-bottom: 0.5px solid #d5d5d5;
  cursor: pointer;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0.25em 0;
  margin: 0.25em 0;
`;

const StyledImage = styled.img`
  width: 30px;
  height: 30px;
`;

function Option({ text, scenerio, handleClick }) {
  return (
    <StyledRow onClick={() => handleClick(scenerio)}>
      <Text setting>{text}</Text>

      <FaAngleRight size={22} color="#a3a3a3" />
    </StyledRow>
  );
}

class Help extends Component {
  state = {
    label: "Scenerios",
    options: [],
    title: null,
    message: null,
    refundItem: false,
    suggestItem: false
  };

  componentDidMount() {
    const { role } = this.props.location.state;
    if (role === "farmer") {
      this.setState({
        options: [
          { text: "I don't have an item.", scenerio: "Missing Item" },
          {
            text: "I need to speak with the market organizer.",
            scenerio: "Assistance Needed"
          }
        ]
      });
    } else {
      this.setState({
        options: [
          { text: "There was a problem with my order.", scenerio: "Problem" },
          {
            text: "I need to speak with the market organizer.",
            scenerio: "Assistance Needed"
          }
        ]
      });
    }
  }

  handleClick = scenerio => {
    switch (scenerio) {
      // FARMER SCENERIOS
      case "Missing Item":
        this.setState({
          options: [
            { text: "Suggest another item.", scenerio: "Suggest Item" },
            {
              text: "Inform customer and refund item.",
              scenerio: "Refund Item"
            }
          ]
        });
        break;
      case "Assistance Needed":
        this.setState({
          options: [],
          title: "Assistance Requested.",
          message:
            "We've sent an email to your market organizer on your behalf. Our customer success representative will follow up with you shortly regarding your request for assistance."
        });
        break;
      case "Refund Item":
        this.setState({
          options: [],
          refundItem: true,
          label: "Select the item you want to refund"
        });
        break;
      case "Suggest Item":
        this.setState({
          options: [],
          suggestItem: true,
          label: "Select the item you want to suggest"
        });
        break;
      // CONSUMER SCENERIOS
      case "Problem":
        this.setState({
          options: [
            {
              text: "My order wasn't available for pickup.",
              scenerio: "Not Available"
            },
            {
              text: "I received an item that I didn't order",
              scenerio: "Wrong Item"
            },
            {
              text: "I didn't receive an item that I ordered.",
              scenerio: "Missing Item From Order"
            },
            {
              text:
                "The listing information does not represent what I received.",
              scenerio: "Misleading"
            }
          ]
        });
        break;
      case "Not Available":
        this.setState({
          options: [],
          title: "Order was not available.",
          message:
            "We've sent an email to your market organizer on your behalf. Our customer success representative will follow up with you shortly regarding your request for assistance."
        });
        break;
      case "Wrong Item":
        this.setState({
          options: [],
          title: "Received an item that I didn't order.",
          message:
            "We've sent an email to your market organizer on your behalf. Our customer success representative will follow up with you shortly regarding your request for assistance."
        });
        break;
      case "Missing Item From Order":
        this.setState({
          options: [],
          title: "I'm missing an item that I ordered.",
          message:
            "We've sent an email to your market organizer on your behalf. Our customer success representative will follow up with you shortly regarding your request for assistance."
        });
        break;
      case "Misleading":
        this.setState({
          options: [],
          title: "Item listing was misleading.",
          message:
            "We've sent an email to your market organizer on your behalf. Our customer success representative will follow up with you shortly regarding your request for assistance."
        });
        break;
      default:
        this.setState({
          options: []
        });
    }
  };

  render() {
    const { orderId } = this.props.location.state;
    const formattedOrder = orderId.split("-")[1];
    const { options, title, message, label } = this.state;
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
        <Navigation />
        <HeroImage title="Help" />
        <Div>
          <Link to="/orders">
            <Text orange margin=".5em 0 .25em 0">
              Back to orders
            </Text>
          </Link>
          <Title margin="0">{`Order #${formattedOrder}`}</Title>
          {title && (
            <div style={{ marginTop: "1em" }}>
              <Text smalltitle>{title}</Text>
              <Text style={{ marginTop: 8 }}>{message}</Text>
            </div>
          )}
          {!title && (
            <div style={{ marginTop: "1em" }}>
              <Label extrasmall>{label}</Label>
              {options.map((key, index) => {
                return (
                  <Option
                    key={index}
                    text={key.text}
                    link={key.link}
                    scenerio={key.scenerio}
                    handleClick={this.handleClick}
                    navigation={this.props.history}
                  />
                );
              })}
              <div style={{ marginTop: "1em" }}>
                <Label extrasmall>Contact us</Label>
                <Row style={{ marginTop: "1em" }}>
                  <a className="drift-open-chat" style={{ cursor: "pointer" }}>
                    <Column
                      style={{ marginRight: "1.75em" }}
                      alignitems="center"
                    >
                      <StyledImage src={Name} />
                      <Text>Chat us</Text>
                    </Column>
                  </a>
                  <a href="mailto:hello@urbancrop.io">
                    <Column alignitems="center">
                      <StyledImage src={Email} />
                      <Text>Email us</Text>
                    </Column>
                  </a>
                </Row>
              </div>
            </div>
          )}
        </Div>
      </div>
    );
  }
}

export default Help;
