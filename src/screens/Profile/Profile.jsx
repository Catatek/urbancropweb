import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchCardsAction } from "../../store/actions/payment";
import Navigation from "../../shared-components/Navigation";
import { Title } from "../../theme";
import { HeroImage } from "../../shared-components";
import { dataSelector } from "../../store/selectors/data";
import AddCardForm from "./AddCardForm";

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
`;

class Profile extends Component {
  componentDidMount() {
    const { fetchCardsAction } = this.props;
    fetchCardsAction();
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    return (
      <div>
        <Navigation />
        <HeroImage title="Profile" />
        <Div>
          <Title>Profile</Title>
        </Div>
        <Div>
          <AddCardForm />
        </Div>
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchCardsAction }
)(Profile);
