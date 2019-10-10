import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchFarmItems, fetchFarmById } from "../../store/actions/data";
import Item from "../../shared-components/Item";
import { Layout, Empty } from "../../shared-components";
import Avatar from "../../shared-components/Avatar";
import Map from "../../shared-components/Map";
import { Title, Row, Text } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import dog from "../../assets/dog1.png";

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  @media (max-width: 920px) {
    width: 90%;
    margin-top: 2em;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 5px 75px;
  max-width: 1300px;
  margin: 1em auto;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
    margin-bottom: 2em;
  }
`;

const StyledBioDiv = styled.div`
  width: 40%;
  @media (max-width: 920px) {
    width: 90%;
  }
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

const MapDiv = styled.div`
  height: 225px;
  width: 100%;
  margin: 0 auto;
`;

class Farm extends Component {
  state = {
    isLoadingItems: true
  };

  componentDidMount() {
    const { fetchFarmById, fetchFarmItems } = this.props;
    const farmId = this.props.match.params.id;
    fetchFarmById(farmId);
    fetchFarmItems(farmId).then(() => {
      this.setState({ isLoadingItems: false });
    });
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const { inventory, farm } = this.props;
    const { isLoadingItems } = this.state;
    const farmName = farm.get("farmName", "");
    const lat = farm.getIn(["location", "coordinates", 0]);
    const lng = farm.getIn(["location", "coordinates", 1]);
    return (
      <Layout title={farmName}>
        <Div>
          <StyledRow>
            <Avatar
              square
              type="farmer"
              farmerAvatar={`${farm.getIn(["farmer", "avatar"], "")}`}
              farmerFirstName={`${farm.getIn(["farmer", "firstName"], "")}`}
              farmerLastName={`${farm.getIn(["farmer", "lastName"], "")}`}
            />
            <StyledBioDiv>
              <Text margin="0" smalltitle>{`${farm.getIn(
                ["farmer", "firstName"],
                ""
              )} ${farm.getIn(["farmer", "lastName"], "")}`}</Text>
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
          {!isLoadingItems && (
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_RzaeDKWkj0MoJn3oaNPaqOWaXAwDr5I&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<MapDiv />}
              mapElement={<div style={{ height: `100%` }} />}
              lat={lat}
              lng={lng}
            />
          )}
        </Div>
        {!isLoadingItems && inventory.size === 0 && (
          <Empty image={dog} title="This farm does not have any products!" />
        )}
        {!isLoadingItems && inventory.size > 0 && (
          <Div>
            <Title>Inventory</Title>
            <Grid>
              {inventory.map((key, index) => {
                return (
                  <Item
                    key={index}
                    images={key.getIn(["images", 0], 0)}
                    itemName={key.get("itemName")}
                    description={key.get("description")}
                    cost={this.formatPrice(key.get("cost", 0))}
                    unit={key.get("unit")}
                    navigation={this.props.history}
                    itemId={key.get("itemId")}
                    quantity={key.get("quantity", 0)}
                    type="inventory"
                  />
                );
              })}
            </Grid>
          </Div>
        )}
      </Layout>
    );
  }
}

export default connect(
  dataSelector,
  { fetchFarmItems, fetchFarmById }
)(Farm);
