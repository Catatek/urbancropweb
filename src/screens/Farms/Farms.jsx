import React, { Component } from "react";
import styled from "styled-components";
import { Empty, Layout, SearchBar, FarmCard } from "../../shared-components";
import { Title, Text, Row } from "../../theme";
import dog from "../../assets/dog1.png";
import { connect } from "react-redux";
import { fetchAllMarketFarms } from "../../store/actions/data";
import { getAllMarketFarms } from "../../store/selectors/data";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import addIcon from "../../assets/addIcon.png";

const Div = styled.div`
  width: 45%;
  margin: 1em auto;
  margin-bottom: 2em;
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
  width: 45%;
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

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 1em;
  margin-right: 0.5em;
`;

const TitleDiv = styled.div`
  @media (max-width: 780px) {
    display: none;
  }
`;

class Farms extends Component {
  state = {
    isLoadingItems: true,
    query: ""
  };

  componentDidMount() {
    const { fetchAllMarketFarms } = this.props;
    const marketId = "market-D3EC";
    fetchAllMarketFarms(marketId).then(() => {
      this.setState({ isLoadingItems: false });
    });
  }

  filterFarms = query => {
    const marketFarms = this.props.marketFarms.toArray();
    if (query) {
      let filteredItems = marketFarms.filter(item => {
        let itemName = item.get("farmName", "").toLowerCase();
        return itemName.indexOf(query.toLowerCase()) !== -1;
      });
      return filteredItems;
    } else {
      return marketFarms;
    }
  };

  handleChange = query => {
    this.setState({ query }, () => {
      this.filterFarms(query);
    });
  };

  render() {
    const { marketFarms } = this.props;
    const { isLoadingItems, query } = this.state;
    const searchFarms = this.filterFarms(query);

    return (
      <Layout title="Farms">
        {!isLoadingItems && marketFarms.size === 0 && (
          <Empty image={dog} title="Your market does not have any farms!" />
        )}
        {!isLoadingItems && marketFarms.size > 0 && (
          <React.Fragment>
            <Div>
              <TitleDiv>
                <Row alignitems="center">
                  <Title margin="0">Farms</Title>
                  {/* <Icon src={addIcon} />
                  <Link to="/inventory/add">
                    <Text orange>Add farm</Text>
                  </Link> */}
                </Row>
              </TitleDiv>
              <SearchBar
                placeholder="Search Farms"
                handleChange={this.handleChange}
                query={query}
              />
            </Div>
            <Grid>
              {searchFarms &&
                searchFarms.map((key, index) => {
                  return (
                    <FarmCard
                      key={index}
                      farmName={key.get("farmName", "")}
                      farmerAvatar={null}
                      farmerFirstName={"William"}
                      farmerLastName={"Whatley"}
                      history={this.props.history}
                      farmId={key.get("farmId", "")}
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
    marketFarms: state => getAllMarketFarms(state)
  }),
  { fetchAllMarketFarms }
)(Farms);
