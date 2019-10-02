import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchMarkets } from "../../store/actions/data";
import { Market, SearchBar, HeroImage } from "../../shared-components";
import Navigation from "../../shared-components/Navigation";
import { Title, Text, Button, Column } from "../../theme";
import { dataSelector } from "../../store/selectors/data";

const Div = styled.div`
  width: 85%;
  max-width: 1300px;
  margin: 1.5em auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 920px) {
    width: 90%;
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
  max-width: 1300px;
  margin: 1em auto;
  grid-gap: 35px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 350px));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 90%;
  }
`;

class Markets extends Component {
  state = {
    query: "",
    isFetchingMarkets: true
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

  calcDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;

      return dist.toFixed(2);
    }
  };

  render() {
    const { query } = this.state;
    const searchMarkets = this.filterMarkets(query);
    const marketCount = this.calcQuantity(searchMarkets.length);

    return (
      <div>
        <Navigation />
        <HeroImage title="Explore Markets" icon />
        <Div>
          <TitleDiv>
            <Title margin=".25em 0 0 0 ">Markets</Title>
            <Text margin=".5em 0 0 0">{marketCount}</Text>
          </TitleDiv>
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
                  lat={key.getIn(["location", "coordinates", 0], "")}
                  lng={key.getIn(["location", "coordinates", 1], "")}
                  userLat={33.753796}
                  userLng={-84.381426}
                  calcDistance={this.calcDistance}
                />
              );
            })}
        </Grid>
        {/* <Column margin="2em auto" alignitems="center">
          <Text>Expand your search area to discover more markets</Text>
          <Button marketsearch>Expand Search Area</Button>
        </Column> */}
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchMarkets }
)(Markets);
