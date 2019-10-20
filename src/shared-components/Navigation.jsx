import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import logo from "../assets/logo.svg";
import basketIcon from "../assets/basket.svg";
import { Nav, Button, Text } from "../theme";
import { fetchCart, fetchConsumerOrder } from "../store/actions/data";
import { fetchProfile } from "../store/actions/auth";
import {
  getUserFirstName,
  getUserLastName,
  getUserAvatar
} from "../store/selectors/auth";
import { getBasket, getCurrentOrder } from "../store/selectors/data";
import { Link, withRouter } from "react-router-dom";
import Avatar from "./Avatar";
import { createStructuredSelector } from "reselect";

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

const Line = styled.div`
  width: 1px;
  background-color: #f1f1f2
  height: 40px;
  margin-right: 2em;
  @media (max-width: 780px) {
    margin-right: 0;
  }
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

// function OrderNav({ orderCount }) {
//   return (
//     <div
//       style={{
//         position: "relative",
//         display: "flex",
//         alignItems: "center",
//         width: 44
//         // marginRight: "2.25em"
//       }}
//     >
//       <Nav to="/orders">Orders</Nav>
//       {orderCount > 0 && (
//         <div
//           style={{
//             position: "absolute",
//             right: -14,
//             top: -8,
//             backgroundColor: "#F75D19",
//             borderRadius: 100,
//             width: 20,
//             height: 20,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center"
//           }}
//         >
//           <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
//             {orderCount}
//           </Text>
//         </div>
//       )}
//     </div>
//   );
// }

function FarmerNav({ history, firstName, lastName, avatar, basketCount }) {
  return (
    <Div>
      <Nav to="/">Explore</Nav>
      <Nav to="/inventory">Farm</Nav>
      <Nav to="/favorites">Favorites</Nav>
      <Nav to="/orders">Orders</Nav>
      <Avatar
        handleClick={() => history.push("/profile")}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
      />
      <Line />
      <Link to="/basket">
        <BasketIcon basketCount={basketCount} />
      </Link>
    </Div>
  );
}

function ConsumerNav({ history, firstName, lastName, avatar, basketCount }) {
  return (
    <Div>
      <Nav to="/">Explore</Nav>
      <Nav to="/favorites">Favorites</Nav>
      <Nav to="/orders">Orders</Nav>
      <Avatar
        handleClick={() => history.push("/profile")}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
      />
      <Line />
      <Link to="/basket">
        <BasketIcon basketCount={basketCount} />
      </Link>
    </Div>
  );
}

function ManagerNav({ history, firstName, lastName, avatar }) {
  return (
    <Div>
      <Nav to="/">Explore</Nav>
      <Nav to="/farms">Farms</Nav>
      <Nav to="/orders">Orders</Nav>
      <Nav to="/orders">Transactions</Nav>
      <Line />
      <Avatar
        handleClick={() => history.push("/profile")}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
      />
    </Div>
  );
}

function SignedOutNav({ history }) {
  return (
    <Div>
      <Nav to="/">Explore</Nav>
      <Button nav onClick={() => history.push("/login")}>
        Sign in
      </Button>
    </Div>
  );
}

class Navigation extends Component {
  componentDidMount() {
    const { fetchCart, fetchProfile, fetchConsumerOrder } = this.props;
    if (this.authUser().auth) {
      fetchProfile();
      fetchCart();
      fetchConsumerOrder();
    }
  }
  componentWillReceiveProps(props) {}

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
    const { basket, history, firstName, lastName, avatar } = this.props;
    const basketCount = basket.size;
    // const orderCount = consumerOrder.size;
    const isAuthed = this.authUser().auth;
    const role = this.authUser().role;

    return (
      <Wrapper>
        <Image src={logo} />

        {role === "farmer" && (
          <FarmerNav
            history={history}
            basketCount={basketCount}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
          />
        )}

        {role === "consumer" && (
          <ConsumerNav
            history={history}
            basketCount={basketCount}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
          />
        )}

        {role === "manager" && (
          <ManagerNav
            history={history}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
          />
        )}
        {!isAuthed && <SignedOutNav history={history} />}
      </Wrapper>
    );
  }
}

export default withRouter(
  connect(
    createStructuredSelector({
      firstName: getUserFirstName,
      lastName: getUserLastName,
      avatar: getUserAvatar,
      consumerOrder: getCurrentOrder,
      basket: getBasket
    }),
    { fetchCart, fetchProfile, fetchConsumerOrder }
  )(Navigation)
);
