import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchMarkets } from "../../store/actions/data";
import { Market, SearchBar } from "../../shared-components";
import Navigation from "../../shared-components/Navigation";
import splash from "../../assets/markets_splash.jpg";
import explore from "../../assets/explore.svg";
import { Title, Text, Button, Column } from "../../theme";
import { dataSelector } from "../../store/selectors/data";

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
  max-width: 1300px;
  margin: 1.5em auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  width: 85%;
  max-width: 1300px;
  margin: 1em auto 0 auto;
  grid-gap: 35px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
  }
`;

class Markets extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { fetchMarkets } = this.props;
    const latlong = "33.7382644468085,-84.3446149148936";

    fetchMarkets(latlong).then(() => {
      this.setState({ isFetchingMarkets: false });
    });
  }

  calcQuantity = quantity => {
    if (quantity === 1) {
      return `${quantity} market near you`;
    } else {
      return `${quantity} markets near you`;
    }
  };

  handleChange = query => {
    this.setState({ query }, () => {
      this.filterMarkets(query);
    });
  };

  filterMarkets = query => {
    const markets = this.props.markets.toArray();
    if (query) {
      let filteredMarkets = markets.filter(market => {
        let marketName = market.get("marketName", "").toLowerCase();
        return marketName.indexOf(query.toLowerCase()) !== -1;
      });
      return filteredMarkets;
    } else {
      return markets;
    }
  };

  render() {
    const { query } = this.state;
    const searchMarkets = this.filterMarkets(query);
    const marketCount = this.calcQuantity(searchMarkets.length);
    return (
      <div>
        <Navigation />
        <SplashImage background={`url('${splash}')`}>
          <Icon src={explore} />
          <Title white>Explore Markets</Title>
        </SplashImage>
        <Div>
          <div>
            <Title margin=".25em 0 0 0 ">Markets</Title>
            <Text margin=".5em 0 0 0">{marketCount}</Text>
          </div>
          <SearchBar
            placeholder="Search Markets"
            handleChange={this.handleChange}
            query={query}
          />
        </Div>

        <Grid>
          {searchMarkets &&
            searchMarkets.map((key, index) => {
              return (
                <Market
                  key={index}
                  id={key.get("marketId", "")}
                  img={key.getIn(["images", 0], "")}
                  marketName={key.get("marketName", "")}
                />
              );
            })}
          {searchMarkets &&
            searchMarkets.map((key, index) => {
              return (
                <Market
                  key={index}
                  id={key.get("marketId", "")}
                  img={key.getIn(["images", 0], "")}
                  marketName={key.get("marketName", "")}
                />
              );
            })}
          {searchMarkets &&
            searchMarkets.map((key, index) => {
              return (
                <Market
                  key={index}
                  id={key.get("marketId", "")}
                  img={key.getIn(["images", 0], "")}
                  marketName={key.get("marketName", "")}
                />
              );
            })}
          {searchMarkets &&
            searchMarkets.map((key, index) => {
              return (
                <Market
                  key={index}
                  id={key.get("marketId", "")}
                  img={key.getIn(["images", 0], "")}
                  marketName={key.get("marketName", "")}
                />
              );
            })}
          {searchMarkets &&
            searchMarkets.map((key, index) => {
              return (
                <Market
                  key={index}
                  id={key.get("marketId", "")}
                  img={key.getIn(["images", 0], "")}
                  marketName={key.get("marketName", "")}
                />
              );
            })}
        </Grid>
        <Column margin="4em auto" alignitems="center">
          <Text>Expand your search area to discover more markets</Text>
          <Button marketsearch>Expand Search Area</Button>
        </Column>
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchMarkets }
)(Markets);
