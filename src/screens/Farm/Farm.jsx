import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchFarmItems, fetchFarmById } from "../../store/actions/data";
import Item from "../../shared-components/Item";
import { Layout, Empty, FarmCard } from "../../shared-components";
import Map from "../../shared-components/Map";
import { Title, Row, Text } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import dog from "../../assets/dog1.png";
import addIcon from "../../assets/addIcon.png";
import { Link } from "react-router-dom";

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

const MapDiv = styled.div`
  height: 225px;
  width: 100%;
  margin: 0 auto;
`;

const TitleDiv = styled.div`
  @media (max-width: 780px) {
    display: none;
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 1em;
  margin-right: 0.5em;
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

  calcQuantity = quantity => {
    if (quantity === 1) {
      return `${quantity} inventory item`;
    } else {
      return `${quantity} inventory items`;
    }
  };

  render() {
    const { inventory, farm } = this.props;
    const { isLoadingItems } = this.state;
    const farmName = farm.get("farmName", "");
    const lat = farm.getIn(["location", "coordinates", 0]);
    const lng = farm.getIn(["location", "coordinates", 1]);
    const productCount = this.calcQuantity(inventory.size);

    return (
      <Layout title={farmName}>
        <Div>
          <FarmCard
            farmerAvatar={`${farm.getIn(["farmer", "avatar"], "")}`}
            farmerFirstName={`${farm.getIn(["farmer", "firstName"], "")}`}
            farmerLastName={`${farm.getIn(["farmer", "lastName"], "")}`}
            type="farmView"
          />

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

        <Div>
          <TitleDiv>
            <Row alignitems="center">
              <Title margin="0">Inventory</Title>
              <Icon src={addIcon} />
              <Link to={`/inventory/add/${farm.get("farmId", "")}`}>
                <Text orange>Add item</Text>
              </Link>
            </Row>
            <Text margin=".5em 0 0 0">{productCount}</Text>
          </TitleDiv>
          {!isLoadingItems && inventory.size === 0 && (
            <Empty image={dog} title="This farm does not have any products!" />
          )}
          {!isLoadingItems && inventory.size > 0 && (
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
                    farmName={farm.get("farmName", "")}
                  />
                );
              })}
            </Grid>
          )}
        </Div>
      </Layout>
    );
  }
}

export default connect(
  dataSelector,
  { fetchFarmItems, fetchFarmById }
)(Farm);
