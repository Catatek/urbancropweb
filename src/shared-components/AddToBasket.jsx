import React, { Component } from "react";
import styled from "styled-components";
import basket from "../assets/add_basket.svg";
import { Text, Row, Button } from "../theme";

const StyledIcon = styled.img`
  height: 13px;
  width: 14px;
`;

const Wrapper = styled(Row)`
  margin: 6px 0;
`;

const StyledRow = styled(Row)`
  align-items: center;
  width: 90px;
`;

const StyledCountText = styled(Text)`
  margin: 0 8px;
  width: auto;
`;

export class AddToBasket extends Component {
  render() {
    const {
      increment,
      decrement,
      count,
      handleAddItem,
      itemId,
      type,
      isAuthed,
      history,
      marketId,
      marketName
    } = this.props;
    return (
      <Wrapper>
        <StyledRow>
          <Button circle onClick={decrement}>
            -
          </Button>
          <StyledCountText>{count || 0}</StyledCountText>
          <Button circle onClick={increment}>
            +
          </Button>
        </StyledRow>
        {type !== "basket" && (
          <Button
            style={{ marginLeft: 16, borderRadius: 10 }}
            onClick={() =>
              isAuthed
                ? handleAddItem(itemId, count)
                : history.push({
                    pathname: "/login",
                    state: { itemId, count, marketId, marketName }
                  })
            }
          >
            <StyledIcon src={basket} />
          </Button>
        )}
        {type === "basket" && (
          <Text style={{ marginLeft: 8, fontWeight: "600" }}>Quantity</Text>
        )}
      </Wrapper>
    );
  }
}
