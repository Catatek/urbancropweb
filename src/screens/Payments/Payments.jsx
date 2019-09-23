import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Navigation from "../../shared-components/Navigation";
import { HeroImage, Account, Modal } from "../../shared-components";
import { Title, Text } from "../../theme";
import { paymentSelector } from "../../store/selectors/payment";
import { fetchCardsAction } from "../../store/actions/payment";
import { Link } from "react-router-dom";
import AddCardForm from "../Profile/AddCardForm";
import { FaPlus } from "react-icons/fa";

const Div = styled.div`
  width: 55%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  @media (max-width: 620px) {
    width: 95%;
  }
`;

const AddCard = styled.div`
  width: 380px;
  height: 80px;
  border-radius: 4px;
  border: solid 1px #f1f1f2;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

class Payments extends Component {
  state = {
    isOpen: false
  };

  componentDidMount() {
    this.props.fetchCardsAction();
  }

  componentWillReceiveProps(props) {}

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const { active, last4, brand, expiry } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <Navigation />
        <HeroImage title="Payment Methods" />
        <Div>
          <Link to="/profile">
            <Text orange margin=".5em 0 .25em 0">{`Back to profile`}</Text>
          </Link>
          <Title margin=".15em 0 0 0">Payment Methods</Title>
        </Div>
        <Div>
          {active && (
            <Account
              type="card"
              last4={last4}
              brand={brand}
              expiry={expiry}
              toggleModal={this.toggleModal}
            />
          )}
          {!active && (
            <AddCard onClick={this.toggleModal}>
              <FaPlus
                style={{ marginRight: ".75em" }}
                size={14}
                color="#f75d19"
              />
              <Text style={{ fontWeight: 600 }} orange>
                Add Card
              </Text>
            </AddCard>
          )}
        </Div>
        <Modal
          title={active ? "Edit Card" : "Add Card"}
          show={isOpen}
          toggleModal={this.toggleModal}
        >
          <AddCardForm active={active} />
        </Modal>
      </div>
    );
  }
}

export default connect(
  paymentSelector,
  { fetchCardsAction }
)(Payments);
