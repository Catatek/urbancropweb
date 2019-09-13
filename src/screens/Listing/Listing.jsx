import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchItem } from "../../store/actions/data";
import Navigation from "../../shared-components/Navigation";
import { Link } from "react-router-dom";
import explore from "../../assets/explore.svg";
import { Title, Text, Row } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import noPesticides from "../../assets/pesticide-free.png";
import organic from "../../assets/organic.png";
import local from "../../assets/vegan.png";
import vegetarian from "../../assets/vegetarian.png";
import noGmo from "../../assets/gmo-free.png";
import Map from "./Map";

const SplashImage = styled.div`
  width: 55%;
  max-width: 1300px;
  height: 320px;
  border-radius: 4px;
  background: ${props => props.background};
  background-size: cover;
  @media (max-width: 920px) {
    width: 75%;
  }
  @media (max-width: 780px) {
    width: 100%;
  }
`;

const Div = styled.div`
  width: 45%;
  max-width: 1300px;
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  @media (max-width: 920px) {
    width: 75%;
    flex-direction: column;
  }
`;

const StyledRow = styled(Row)`
  height: 95px;
  width: 100%;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`;

const MapDiv = styled.div`
  height: 370px;
  width: 45%;
  max-width: 1100px;
  margin: 2em auto;
  @media (max-width: 920px) {
    width: 75%;
  }
  @media (max-width: 500px) {
    height: 350px;
  }
`;

function Attributes({ attributes }) {
  return (
    <StyledRow>
      {attributes &&
        attributes.map((key, index) => {
          return (
            <div
              key={index}
              style={{
                alignItems: "center",
                marginRight: "2.5em",
                textAlign: "center"
              }}
            >
              <StyledImage src={key.icon} />
              <Text attribute key={index}>
                {key.label}
              </Text>
            </div>
          );
        })}
    </StyledRow>
  );
}

class Listing extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  state = {
    isFetchingItem: true
  };
  componentDidMount() {
    const { fetchItem } = this.props;
    const itemId = this.props.match.params.id;
    fetchItem(itemId).then(() => {
      this.setState({ isFetchingItem: false });
    });
  }

  handleAttributes = attributes => {
    let arr = [];
    if (attributes.includes("Local")) {
      arr.push({ label: "Local Origin", icon: local });
    }
    if (attributes.includes("Vegetarian")) {
      arr.push({ label: "Vegetarian", icon: vegetarian });
    }
    if (attributes.includes("Non GMO")) {
      arr.push({ label: "GMO Free", icon: noGmo });
    }
    if (attributes.includes("Organic")) {
      arr.push({ label: "Organic", icon: organic });
    }
    if (attributes.includes("No Pesticides")) {
      arr.push({ label: "No Pesticide", icon: noPesticides });
    }

    return arr;
  };

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const marketName = this.props.location.state.marketName;
    const marketId = this.props.location.state.marketId;
    const itemName = this.props.location.state.itemName;
    const { item } = this.props;
    const { isFetchingItem } = this.state;
    const attributesArr = this.handleAttributes(
      item.getIn(["item", "attributes"], "")
    );
    const lat = item.getIn(["farm", "location", "coordinates", 0]);
    const lng = item.getIn(["farm", "location", "coordinates", 1]);
    console.log(lat, lng);

    return (
      <div>
        <Navigation />
        <div
          style={{
            margin: "2em auto",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <SplashImage
            background={`url('${item.getIn(["item", "images", 0], "")}')`}
          />
        </div>

        <Div>
          <div>
            <Link to={`/market/${marketId}`}>
              <Text
                orange
                margin=".5em 0 .25em 0"
              >{`Explore Markets / ${marketName}`}</Text>
            </Link>
            <Title>{`${itemName} from ${item.getIn(
              ["farm", "farmName"],
              ""
            )}`}</Title>
          </div>
        </Div>
        <Div>
          <div style={{ width: "85%" }}>
            <Text>{item.getIn(["item", "description"])}</Text>
          </div>
        </Div>

        {!isFetchingItem && item.getIn(["item", "attributes"]).size > 0 && (
          <Div>
            <Attributes attributes={attributesArr} />
          </Div>
        )}
        {!isFetchingItem && (
          <Map
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe6xsQwAD0234Km-Dvf_fIXq5OlMVMuXA&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<MapDiv />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={lat}
            lng={lng}
          />
        )}
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchItem }
)(Listing);
