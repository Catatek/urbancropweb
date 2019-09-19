import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import logo from "../assets/logo.svg";
import basketIcon from "../assets/basket.svg";
import { Nav, Button, Text } from "../theme";
import { fetchCart, fetchConsumerOrder } from "../store/actions/data";
import { fetchProfile } from "../store/actions/auth";
import { dataSelector } from "../store/selectors/data";
import { Link, withRouter } from "react-router-dom";
import DropdownModal from "./DropdownModal";
import Avatar from "./Avatar";

const Wrapper = styled.div`
  background: #fff;
  height: 80px;
  margin: 0 auto;
  width: 85%;
  max-width: 1300px;
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

function BasketIcon({ basketCount }) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Icon src={basketIcon} />
      {basketCount > 0 && (
        <div
          style={{
            position: "absolute",
            right: -12,
            top: -8,
            backgroundColor: "#F75D19",
            borderRadius: 100,
            width: 20,
            height: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {basketCount}
          </Text>
        </div>
      )}
    </div>
  );
}

function OrderNav({ orderCount }) {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Nav to="/orders">Orders</Nav>
      {orderCount > 0 && (
        <div
          style={{
            position: "absolute",
            right: -4,
            top: -8,
            backgroundColor: "#F75D19",
            borderRadius: 100,
            width: 20,
            height: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
            {orderCount}
          </Text>
        </div>
      )}
    </div>
  );
}

class Navigation extends Component {
  componentDidMount() {
    const { fetchCart, fetchProfile, fetchConsumerOrder } = this.props;
    fetchProfile();
    fetchCart();
    fetchConsumerOrder();
  }
  componentWillReceiveProps(props) {}

  onClickOption = val => {
    this.props.history.push(val.link);
  };

  logout = val => {
    this.props.history.push(val.link);
    localStorage.clear();
  };

  getOptions = () => {
    return [
      {
        label: "Support",
        link: "/",
        iconClassName: "fa fa-question-circle",
        onClick: this.onClickOption
      },
      {
        label: "Product Updates",
        link: "/updates",
        iconClassName: "fas fa-exclamation-circle",
        onClick: this.onClickOption
      },
      {
        label: "Logout",
        link: "/",
        color: "#f2451a",
        iconClassName: "ace-icon fa fa-power-off",
        onClick: this.logout
      }
    ];
  };

  authUser = () => {
    let auth;
    const token = localStorage.getItem("authorization");
    const role = localStorage.getItem("role") || "";
    if (token) {
      auth = true;
    } else {
      auth = false;
    }
    return { auth, role };
  };

  render() {
    const { basket, consumerOrder, history } = this.props;
    const basketCount = basket.size;
    const orderCount = consumerOrder.size;
    const isAuthed = this.authUser().auth;
    const role = this.authUser().role;

    return (
      <Wrapper>
        <Image src={logo} />
        <Div>
          <Nav to="/">Explore</Nav>
          {/* {role === "farmer" && <Nav to="/vendors">Farm</Nav>} */}

          <Nav to="/orders">Orders</Nav>
          {isAuthed && <Nav to="/">Favorites</Nav>}
          {isAuthed && (
            <Avatar
              render={display => (
                <DropdownModal options={this.getOptions()} display={display} />
              )}
            />
          )}

          {!isAuthed && (
            <Button nav onClick={() => history.push("/login")}>
              Sign in
            </Button>
          )}
          {isAuthed && (
            <Link to="/basket">
              <BasketIcon basketCount={basketCount} />
            </Link>
          )}
        </Div>
      </Wrapper>
    );
  }
}

export default withRouter(
  connect(
    dataSelector,
    { fetchCart, fetchProfile, fetchConsumerOrder }
  )(Navigation)
);
