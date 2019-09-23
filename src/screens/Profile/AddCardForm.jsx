import React, { Component } from "react";
import { Button, Row } from "../../theme/index";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe
} from "react-stripe-elements";
import { addCardAction } from "../../store/actions/payment";
import styled from "styled-components";

import { connect } from "react-redux";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 0 auto;
  margin-top: 2em;
`;

const style = () => {
  return {
    style: {
      base: {
        fontFamily: "proxima-nova, sans-serif",
        letterSpacing: ".2em",
        margin: ".5em 0",
        "::placeholder": {
          color: "#666"
        }
      },
      invalid: {
        color: "red"
      },
      complete: {
        color: "#3aaa35"
      }
    }
  };
};

class Form extends Component {
  state = {
    isAddingCard: false,
    validationData: null
  };
  handleSubmit = async ev => {
    const { stripe, addCardAction } = this.props;
    ev.preventDefault();
    try {
      this.setState({ isAddingCard: true });
      const token = await stripe.createToken();
      await addCardAction({ stripeToken: token.token.id });
    } catch (error) {
      this.setState({
        validationData: {
          message: error.message,
          type: "error",
          isAddingCard: false
        }
      });
    }
  };

  render() {
    const { active } = this.props;
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <CardElement {...style()} />
        <Row margin=".5em 0 0 0">
          <Button checkout active margin="1em 0 0 0" type="submit">
            {active ? "Save" : "Add"}
          </Button>
        </Row>
      </StyledForm>
    );
  }
}
const CardForm = injectStripe(Form);

function AddCardForm(props) {
  return (
    <StripeProvider apiKey="pk_test_a5i7XL9ASV3LvZcLcLBofxvl">
      <Elements>
        <CardForm addCardAction={props.addCardAction} active={props.active} />
      </Elements>
    </StripeProvider>
  );
}
export default connect(
  null,
  { addCardAction }
)(AddCardForm);
