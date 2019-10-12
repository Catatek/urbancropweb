import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchConsumerOrder,
  fetchPastConsumerOrders
} from "../../store/actions/data";
import { Layout } from "../../shared-components";
import { Text, Column } from "../../theme";
import FarmOrders from "./FarmOrders";
import MyOrders from "./MyOrders";

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
    selected: ""
  };

  componentDidMount() {
    const role = localStorage.getItem("role") || "consumer";
    if (role === "farmer") {
      this.setState({ selected: "farmOrders" });
    } else {
      this.setState({ selected: "myOrders" });
    }
  }

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
      <Layout title="Orders">
        {role === "farmer" && (
          <Tabs handleClick={this.handleClick} selected={selected} />
        )}
        {selected === "farmOrders" && <FarmOrders />}
        {selected === "myOrders" && <MyOrders />}
      </Layout>
    );
  }
}

export default connect(
  null,
  { fetchConsumerOrder, fetchPastConsumerOrders }
)(Orders);
