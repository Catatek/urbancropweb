import React from "react";
import { Row, Text, Column, Button } from "../theme";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaBuilding
} from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 350px;
  height: 80px;
  border-radius: 4px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  margin-right: 16px;
`;

export function Account({
  type,
  last4,
  expiry,
  bankName,
  brand,
  onEdit,
  navigation,
  toggleModal
}) {
  return (
    <AccountCard
      type={type}
      bankName={bankName}
      expiry={expiry}
      last4={last4}
      brand={brand}
      onEdit={onEdit}
      navigation={navigation}
      toggleModal={toggleModal}
    />
  );
}

function AccountCard({ type, last4, brand, bankName, toggleModal, expiry }) {
  return (
    <Wrapper
      onClick={toggleModal}
      style={{
        shadowColor: "#989898",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 1
      }}
    >
      <Row
        alignitems="center"
        justifycontent="space-between"
        width="90%"
        margin="0 auto"
      >
        <Row>
          <Container>
            {type === "card" && brand === "Visa" && (
              <FaCcVisa size={48} color={"#1a1876"} name="cc-visa" />
            )}
            {type === "card" && brand === "MasterCard" && (
              <FaCcMastercard size={48} color={"#ccc"} name="cc-mastercard" />
            )}
            {type === "card" && brand === "American Express" && (
              <FaCcAmex size={48} color={"#ccc"} name="cc-amex" />
            )}
            {type === "card" && brand === "Discover" && (
              <FaCcDiscover size={48} color={"#ccc"} name="cc-discover" />
            )}
            {type === "bank_account" && (
              <FaBuilding size={48} color={"#ccc"} name="university" />
            )}
          </Container>
          <Column alignitems="flex-start" justifycontent="center">
            {/* <Text margin="0">{type === "card" ? "Card" : "Bank Account"}</Text> */}
            <Text margin="0" style={{ fontWeight: 600 }}>
              {type === "card" ? `**** **** **** ${last4}` : bankName}
            </Text>
            <Text margin="0">{type === "card" && ` ${expiry}`}</Text>
          </Column>
        </Row>
        <Button marginright="0" onClick={toggleModal}>
          Edit
        </Button>
      </Row>
    </Wrapper>
  );
}
