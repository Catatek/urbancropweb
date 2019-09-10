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
  height: 320px;
  border-radius: 4px;
  background: ${props => props.background};
  background-size: cover;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 1.5em;
`;

const Div = styled.div`
  width: ${props => props.width || "45%"};
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

const StyledRow = styled(Row)`
  height: 95px;
  width: 100%;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
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
            <Link to={`/market/${marketName}`}>
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
            containerElement={
              <div
                style={{
                  height: `370px`,
                  width: "45%",
                  margin: "0 auto",
                  marginBottom: "2em"
                }}
              />
            }
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
