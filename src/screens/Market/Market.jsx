import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchItems, addItemToCart } from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import Item from "../../shared-components/Item";
import { SearchBar, HeroImage } from "../../shared-components/index";
import { Title, Text } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
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

const TitleDiv = styled.div`
  @media (max-width: 780px) {
    display: none;
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

class Market extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { fetchItems, location, addItemToCart } = this.props;
    const addToBasketState = location.state && location.state.addToBasketState;
    const marketId = this.props.match.params.id;
    fetchItems(marketId).then(() => {
      this.setState({ isFetchingMarkets: false });
    });
    if (addToBasketState) {
      let data = {
        itemQuantity: addToBasketState.count
      };
      let sku = addToBasketState.itemId;
      addItemToCart(sku, data).then(() => {
        console.log("HERE");
      });
    }
  }

  calcQuantity = quantity => {
    if (quantity === 1) {
      return `${quantity} product available`;
    } else {
      return `${quantity} products available`;
    }
  };

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  handleChange = query => {
    this.setState({ query }, () => {
      this.filterProducts(query);
    });
  };

  filterProducts = query => {
    const items = this.props.items.toArray();
    if (query) {
      let filteredItems = items.filter(item => {
        let itemName = item.getIn(["item", "itemName"], "").toLowerCase();
        return itemName.indexOf(query.toLowerCase()) !== -1;
      });
      return filteredItems;
    } else {
      return items;
    }
  };

  render() {
    const { query } = this.state;
    const marketName = "Statesboro Farmer's Market";
    const marketId = this.props.match.params.id;
    const searchProducts = this.filterProducts(query);
    const productCount = this.calcQuantity(searchProducts.length);

    return (
      <div>
        <Navigation />
        <HeroImage title={marketName} icon />
        <Div>
          <TitleDiv>
            <Link to="/">
              <Text orange margin=".5em 0 .25em 0">{`Explore Markets`}</Text>
            </Link>
            <Title margin="0">Products</Title>
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
                  marketName={marketName}
                  unit={key.getIn(["item", "unit"])}
                  quantity={key.getIn(["item", "quantity"])}
                  cost={this.formatPrice(key.getIn(["item", "cost"], 0))}
                  itemId={key.getIn(["item", "itemId"])}
                  attributes={key.getIn(["item", "attributes"])}
                  images={key.getIn(["item", "images", 0], 0)}
                  itemName={key.getIn(["item", "itemName"], "")}
                  category={key.getIn(["item", "category"], "")}
                  navigation={this.props.navigation}
                  farmName={key.getIn(["farm", "farmName"], "")}
                  farmId={key.getIn(["farm", "farmId"], "")}
                  history={this.props.history}
                  marketId={marketId}
                />
              );
            })}
        </Grid>
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchItems, addItemToCart }
)(Market);
