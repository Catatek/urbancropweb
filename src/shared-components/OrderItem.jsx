import React, { Component } from "react";
import styled from "styled-components";
import { Row, Text, Subtitle } from "../theme";

const Wrapper = styled(Row)`
  align-items: center;
  justify-content: space-between;
  height: 55px;
  border-bottom: ${props => props.borderbottom || "0.5px solid #d5d5d5"};
`;

export class OrderItem extends Component {
  handleTextFormatting = (unit, quantity) => {
    let str = "";
    if (quantity === 1) {
      str = `${unit}`;
    } else {
      str = `${unit}s`;
    }
    return str.trim();
  };

  render() {
    const {
      quantity,
      unit,
      itemName,
      cost,
      formatPrice,
      type,
      itemId,
      navigate
    } = this.props;

    return (
      <React.Fragment>
        <Wrapper borderbottom={type === "total" && ".5px solid transparent"}>
          <Row>
            {type === "orders" && (
              <Row>
                <Text basketitem>
                  {` ${quantity} ${this.handleTextFormatting(
                    unit,
                    quantity
                  )} of`}
                </Text>
                &nbsp;
                <Text
                  basketitem
                  orange
                  onClick={() =>
                    navigate.push(`/product/${itemId}`, { itemName, itemId })
                  }
                >
                  {`${itemName}`}
                </Text>
                &nbsp;
                <Text basketitem>at </Text>&nbsp;
                <Text basketitem black>
                  {`$${formatPrice(cost)}`}
                </Text>
              </Row>
            )}

            {type === "total" && <Subtitle>Total</Subtitle>}
          </Row>
          {type === "orders" && (
            <Text basketitem black>
              {`$${formatPrice(quantity * cost)}`}
            </Text>
          )}
          {type === "total" && <Subtitle>{`$${formatPrice(cost)}`}</Subtitle>}
        </Wrapper>
      </React.Fragment>
    );
  }
}
