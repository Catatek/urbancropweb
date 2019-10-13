import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Navigation from "../../shared-components/Navigation";
import { HeroImage, Account, Modal } from "../../shared-components";
import { Title, Text } from "../../theme";
import {
  fetchACHDetailsAction,
  updateACHAction
} from "../../store/actions/payout";
import { payoutSelector } from "../../store/selectors/payout";
import { Link } from "react-router-dom";
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

class Payouts extends Component {
  componentDidMount() {
    this.props.fetchACHDetailsAction();
    this.handleEdit();
  }

  componentWillReceiveProps(props) {}

  handleEdit = async () => {
    const { updateACHAction } = this.props;
    const url = await updateACHAction();
    console.log(url, "URL");

    return url;
  };

  render() {
    const { achDetails } = this.props;
    const STRIPE_TEST_CLIENT_ID = "ca_F6XDlkXgCaPpzXf5vLVcnDmP4fwV2FzI";
    const STRIPE_OAUTH_URI = `https://connect.stripe.com/express/oauth/authorize?redirect_uri=https://market.urbancrop.io/profile/payouts&response_type=code&client_id=${STRIPE_TEST_CLIENT_ID}&state={STATE_VALUE}&scope=read_write`;

    return (
      <div>
        <Navigation />
        <HeroImage title="Payout Methods" />
        <Div>
          <Link to="/profile">
            <Text orange margin=".5em 0 .25em 0">{`Back to profile`}</Text>
          </Link>
          <Title margin=".15em 0 0 0">Payout Methods</Title>
          {!achDetails && (
            <div style={{ width: "50%" }}>
              <Text>
                We take your privacy incredibly serious, which is why we’ve
                partnered with Stripe to connect to your bank or debit card.
                After you connect, you can pay yourself!
              </Text>
            </div>
          )}
        </Div>
        <Div>
          {achDetails && (
            <Account
              type="bank_account"
              bankName={achDetails.get("bankName", "")}
              last4={achDetails.get("last4Digits", "")}
              handleEdit={this.handleEdit}
            />
          )}
          {!achDetails && (
            <a href={STRIPE_OAUTH_URI}>
              <AddCard>
                <FaPlus
                  style={{ marginRight: ".75em" }}
                  size={14}
                  color="#f75d19"
                />
                <Text style={{ fontWeight: 600 }} orange>
                  Add Account
                </Text>
              </AddCard>
            </a>
          )}
        </Div>
      </div>
    );
  }
}

export default connect(
  payoutSelector,
  { fetchACHDetailsAction, updateACHAction }
)(Payouts);
