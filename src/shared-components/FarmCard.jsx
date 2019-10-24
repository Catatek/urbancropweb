import React, { Component } from "react";
import styled from "styled-components";
import { Text, Row } from "../theme";
import Avatar from "./Avatar";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 auto;
  padding: 0.75em 0;
  box-shadow: ${props =>
    props.boxshadow &&
    " 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"};
`;

const Container = styled.div`
  width: ${props => (props.farmView ? "45%" : "85%")};
  margin: ${props => (props.farmView ? "" : "0 auto")};
  @media (max-width: 1300px) {
    width: 90%;
  }
  @media (max-width: 780px) {
    margin: 0 auto;
  }
`;

const StyledBioDiv = styled.div`
  width: 90%;
  @media (max-width: 780px) {
    width: 100%;
    margin-top: 2em;
  }
`;

const StyledRow = styled(Row)`
  margin: 1em 0;
  align-items: center;
  @media (max-width: 780px) {
    flex-direction: column;
    margin: 0 0 2em 0;
  }
`;

export class FarmCard extends Component {
  render() {
    const {
      farmName,
      history,
      farmerAvatar,
      farmerFirstName,
      farmerLastName,
      farmId,
      type
    } = this.props;

    return (
      <Wrapper
        boxshadow={type === "allFarms"}
        onClick={() => history.push(`/farms/${farmId}`)}
      >
        <Container farmView={type === "farmView"}>
          <StyledRow>
            <Avatar
              square
              type="farmer"
              farmerAvatar={farmerAvatar}
              farmerFirstName={farmerFirstName}
              farmerLastName={farmerLastName}
            />
            <StyledBioDiv>
              {type === "farmView" && (
                <Text
                  margin="0"
                  smalltitle
                >{`${farmerFirstName} ${farmerLastName}`}</Text>
              )}
              {type === "allFarms" && (
                <Text smalltitle margin="0">{`${farmName} `}</Text>
              )}
              <Text>
                Relinda Walker is the grower at Walker Farms, a 50-acre
                certified organic farm near Newington, Georgia. Farmer Relinda
                grows carrots, beets, salad and bulb onions, spinach, salad
                greens, fingerling potatoes, beans and peas, sweet corn, okra,
                melons and many unique items. She’s been providing healthy food
                to local customers for nine years.
              </Text>
            </StyledBioDiv>
          </StyledRow>
        </Container>
      </Wrapper>
    );
  }
}
