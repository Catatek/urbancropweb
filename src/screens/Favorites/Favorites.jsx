import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchAllFavorites } from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import { Title } from "../../theme";
import { HeroImage, Empty, SmallItemCard } from "../../shared-components";
import { dataSelector } from "../../store/selectors/data";
import cat from "../../assets/cat2.png";

const Div = styled.div`
  width: 45%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  @media (max-width: 920px) {
    width: 90%;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 15px;
  max-width: 1300px;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
  }
`;

class Favorites extends Component {
  state = {
    isLoadingItems: true
  };
  componentDidMount() {
    const { fetchAllFavorites } = this.props;
    fetchAllFavorites().then(() => {
      this.setState({ isLoadingItems: false });
    });
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const { favorites } = this.props;
    const { isLoadingItems } = this.state;

    return (
      <div>
        <Navigation />
        <HeroImage title="Favorites" />
        {!isLoadingItems && favorites.size === 0 && (
          <Empty image={cat} title="You do not have any favorites!" />
        )}
        {!isLoadingItems && favorites.size > 0 && (
          <Div>
            <Title>Favorites</Title>
            <Grid>
              {favorites.map((key, index) => {
                return (
                  <SmallItemCard
                    key={index}
                    image={key.getIn(["images", 0], 0)}
                    itemName={key.get("itemName")}
                    description={key.get("description")}
                    cost={key.get("cost", 0)}
                    unit={key.get("unit", "")}
                    formatPrice={this.formatPrice}
                    type="favorite"
                    itemId={key.get("itemId", "")}
                    navigation={this.props.history}
                    deleteFavorite={this.props.deleteFavorite}
                  />
                );
              })}
            </Grid>
          </Div>
        )}
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchAllFavorites }
)(Favorites);
