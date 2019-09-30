import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchAllFavorites } from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import { Title } from "../../theme";
import { HeroImage, Empty } from "../../shared-components";
import { dataSelector } from "../../store/selectors/data";
import cat from "../../assets/cat2.png";

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
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
    console.log(favorites.size);

    return (
      <div>
        <Navigation />
        <HeroImage title="Favorites" />
        {!isLoadingItems && favorites.size === 0 && (
          <Empty image={cat} title="You do not have any current orders!" />
        )}
        {!isLoadingItems && favorites.size > 0 && (
          <Div>
            <Title>Favorites</Title>
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
