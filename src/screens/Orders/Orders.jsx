import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchConsumerOrder,
  fetchPastConsumerOrders
} from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import { HeroImage } from "../../shared-components";
import { Text, Column } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import MyOrders from "./MyOrders";
import FarmOrders from "./FarmOrders";

const Div = styled.div`
  width: 45%;
  margin: 0 auto;
  margin: 1em auto;
  display: flex;
  @media (max-width: 920px) {
    width: 90%;
  }
`;

const Line = styled.div`
  width: 85px;
  height: 2px;
  background: ${props => (props.active ? "#f75d19" : "transparent")};
  transition: 250ms;
  transition-timing-function: ease-out;
`;

function Tabs({ handleClick, selected }) {
  return (
    <Div>
      <Column
        alignitems="center"
        onClick={() => handleClick("farmOrders")}
        style={{ marginRight: "1em", cursor: "pointer" }}
      >
        <Text style={{ fontWeight: 600 }} orange={selected === "farmOrders"}>
          Farm orders
        </Text>
        <Line active={selected === "farmOrders"} />
      </Column>
      <Column
        alignitems="center"
        onClick={() => handleClick("myOrders")}
        style={{ cursor: "pointer" }}
      >
        <Text style={{ fontWeight: 600 }} orange={selected === "myOrders"}>
          My orders
        </Text>
        <Line active={selected === "myOrders"} />
      </Column>
    </Div>
  );
}

class Orders extends Component {
  state = {
    selected: "farmOrders"
  };

  componentDidMount() {}

  handleClick = selected => {
    this.setState({ selected });
  };

  authRole = () => {
    const role = localStorage.getItem("role") || "consumer";

    return role;
  };

  render() {
    const { selected } = this.state;
    const role = this.authRole();
    return (
      <div>
        <Navigation />
        <HeroImage title="Orders" />
        {role === "farmer" && (
          <Tabs handleClick={this.handleClick} selected={selected} />
        )}
        {selected === "farmOrders" && <FarmOrders />}
        {selected === "myOrders" && <MyOrders />}
      </div>
    );
  }
}

export default connect(
  null,
  { fetchConsumerOrder, fetchPastConsumerOrders }
)(Orders);
