import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchFarmItems } from "../../store/actions/data";
import { fetchFarm } from "../../store/actions/auth";
import Item from "../../shared-components/Item";
import { Layout, Empty, SearchBar } from "../../shared-components";
import { Title, Text, Row } from "../../theme";
import { getInventory } from "../../store/selectors/data";
import cat from "../../assets/cat1.png";
import { getUserFarmId } from "../../store/selectors/auth";
import { createStructuredSelector } from "reselect";
import addIcon from "../../assets/addIcon.png";
import { Link } from "react-router-dom";

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  @media (max-width: 920px) {
    width: 90%;
    margin-top: 2em;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 85%;
  grid-gap: 5px 75px;
  max-width: 1300px;
  margin: 1em auto 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 90%;
    margin-bottom: 2em;
  }
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

class Inventory extends Component {
  state = {
    isLoadingItems: true,
    query: "",
  };

  componentDidMount() {
    const { farmId, fetchFarm, fetchFarmItems } = this.props;
    console.log(farmId, "HERE");
    fetchFarm(farmId);
    fetchFarmItems(farmId).then(() => {
      this.setState({ isLoadingItems: false });
    });
  }

  componentDidUpdate(prevProps) {
    const { farmId, fetchFarm, fetchFarmItems } = this.props;
    if (prevProps.farmId !== farmId) {
      fetchFarm(farmId);
      fetchFarmItems(farmId).then(() => {
        this.setState({ isLoadingItems: false });
      });
    }
  }

  formatPrice = (x) => {
    return (x / 100).toFixed(2);
  };

  calcQuantity = (quantity) => {
    if (quantity === 1) {
      return `${quantity} inventory item`;
    } else {
      return `${quantity} inventory items`;
    }
  };

  filterProducts = (query) => {
    const inventory = this.props.inventory.toArray();
    if (query) {
      let filteredItems = inventory.filter((item) => {
        let itemName = item.get("itemName", "").toLowerCase();
        return itemName.indexOf(query.toLowerCase()) !== -1;
      });
      return filteredItems;
    } else {
      return inventory;
    }
  };

  handleChange = (query) => {
    this.setState({ query }, () => {
      this.filterProducts(query);
    });
  };

  render() {
    const { inventory, farmId } = this.props;
    const { isLoadingItems, query } = this.state;
    const searchProducts = this.filterProducts(query);
    const productCount = this.calcQuantity(searchProducts.length);

    return (
      <Layout title="Inventory">
        {!isLoadingItems && inventory.size === 0 && (
          <Empty image={cat} title="You do not have any inventory!" />
        )}
        {!isLoadingItems && inventory.size > 0 && (
          <React.Fragment>
            <Div>
              <TitleDiv>
                <Row alignitems="center">
                  <Title margin="0">Inventory</Title>
                  <Icon src={addIcon} />
                  <Link to={`/inventory/add/${farmId}`}>
                    <Text orange>Add item</Text>
                  </Link>
                </Row>
                <Text margin=".5em 0 0 0">{productCount}</Text>
              </TitleDiv>
              <SearchBar
                placeholder="Search Products"
                handleChange={this.handleChange}
                query={query}
              />
            </Div>
            <Grid>
              {searchProducts &&
                searchProducts.map((key, index) => {
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
          </React.Fragment>
        )}
      </Layout>
    );
  }
}

export default connect(
  createStructuredSelector({
    farmId: (state) => getUserFarmId(state),
    inventory: (state) => getInventory(state),
  }),
  { fetchFarmItems, fetchFarm }
)(Inventory);
