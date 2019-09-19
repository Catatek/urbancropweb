import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchAllFavorites } from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import { Title } from "../../theme";
import { HeroImage } from "../../shared-components";
import { dataSelector } from "../../store/selectors/data";

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
`;

class Favorites extends Component {
  componentDidMount() {
    const { fetchAllFavorites } = this.props;
    fetchAllFavorites();
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    console.log(this.props.favorites, "fav");

    return (
      <div>
        <Navigation />
        <HeroImage title="Favorites" />
        <Div>
          <Title>Favorites</Title>
        </Div>
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchAllFavorites }
)(Favorites);
