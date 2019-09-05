import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchItems } from "../../store/actions/data";
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
`;

const Grid = styled.div`
  display: grid;
  width: 85%;
  grid-gap: 25px;
  margin: 1em auto 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(275px, 400px));
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
    const { fetchItems } = this.props;
    const marketId = this.props.match.params.id;
    fetchItems(marketId).then(() => {
      this.setState({ isFetchingMarkets: false });
    });
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
          <SearchBar handleChange={this.handleChange} query={query} />
        </Div>
        <Grid>
          {searchProducts &&
            searchProducts.map((key, index) => {
              return (
                <Item
                  key={index}
                  marketName={key.get("marketName", "")}
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
  { fetchItems }
)(Market);
