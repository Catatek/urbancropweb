import React from "react";
import styled from "styled-components";
import { Column, Text, Row } from "../theme";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 145px;
  border-radius: 4px;
  background-color: #fff;
  align-items: center;
  margin: 8px auto;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin: 0 24px;
  object-fit: cover;
`;

const StyledRow = styled(Row)`
  margin-right: 24px;
`;

export function SmallItemCard({
  itemName,
  image,
  cost,
  unit,
  formatPrice,
  index,
  editMode,
  type,
  itemId,
  navigation,
  deleteFavorite,
  description
}) {
  return (
    <Wrapper
      onClick={() =>
        navigation.push(`/product/${itemId}`, { itemId, itemName })
      }
      style={{
        shadowColor: "#989898",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 1
      }}
    >
      <Row>
        <StyledImage src={image} />
        <Column>
          <Text smalltitle black margin="0">
            {itemName}
          </Text>
          <Text basketitem margin=".5em 0 0 0">{`$${formatPrice(
            cost
          )}/${unit}`}</Text>
          <Text margin="0">{`${description.substring(0, 45)}...`}</Text>
        </Column>
      </Row>
      <StyledRow>
        {type === "additem" && (
          <Text basketitem orange onPress={() => editMode(index)}>
            Edit
          </Text>
        )}
        {/* {type === 'favorite' && (
            <TouchableOpacity onPress={() => deleteFavorite({ itemId })}>
              <Ionicons name={'ios-close'} size={28} color={'#a3a3a3'} />
            </TouchableOpacity>
          )} */}
      </StyledRow>
    </Wrapper>
  );
}
