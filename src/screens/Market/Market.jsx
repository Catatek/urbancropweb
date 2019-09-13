import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchItems, addItemToCart } from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import Item from "../../shared-components/Item";
import { SearchBar } from "../../shared-components/index";
import splash from "../../assets/markets_splash.jpg";
import explore from "../../assets/explore.svg";
import { Title, Text } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import { Link } from "react-router-dom";

const SplashImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.background};
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 1.5em;
`;

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
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
    width: 100%;
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
    const marketName = this.props.location.state.marketName;
    const marketId = this.props.match.params.id;
    const searchProducts = this.filterProducts(query);
    const productCount = this.calcQuantity(searchProducts.length);

    return (
      <div>
        <Navigation />
        <SplashImage background={`url('${splash}')`}>
          <Icon src={explore} />
          <Title white>{marketName}</Title>
        </SplashImage>
        <Div>
          <div>
            <Link to="/">
              <Text orange margin=".5em 0 .25em 0">{`Explore Markets`}</Text>
            </Link>
            <Title margin="0">Products</Title>
            <Text margin=".5em 0 0 0">{productCount}</Text>
          </div>
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
