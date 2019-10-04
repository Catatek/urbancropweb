import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchItem,
  fetchFavorite,
  addFavorite,
  deleteFavorite,
  addItemToCart
} from "../../store/actions/data";
import { POST_ITEM_TO_CART } from "../../store/types/data";
import Navigation from "../../shared-components/Navigation";
import { Link } from "react-router-dom";
import { Title, Text, Row } from "../../theme";
import { getItem, getFarmId } from "../../store/selectors/data";
import { getUserFarmId } from "../../store/selectors/auth";
import noPesticides from "../../assets/pesticide-free.png";
import organic from "../../assets/organic.png";
import local from "../../assets/vegan.png";
import vegetarian from "../../assets/vegetarian.png";
import noGmo from "../../assets/gmo-free.png";
import Map from "./Map";
import Avatar from "../../shared-components/Avatar";
import { PurchaseBar, FarmerBar } from "../../shared-components";
import {
  FaRegHeart,
  FaHeart,
  FaFacebook,
  FaTwitter,
  FaWhatsappSquare
} from "react-icons/fa";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton
} from "react-share";
import { showMessage } from "../../redux_util";
import { createStructuredSelector } from "reselect";

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
  @media (max-width: 780px) {
    width: 85%;
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
  margin-bottom: 8em;
  @media (max-width: 920px) {
    width: 75%;
    margin-bottom: 2em;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
  @media (max-width: 500px) {
    height: 350px;
  }
`;

const ShareBarWrapper = styled.div`
  position: fixed;
  left: 15%;
  top: 50%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 920px) {
    position: relative;
    flex-direction: row;
    margin: 0 auto;
    margin-bottom: 6.5em;
    width: 75%;
    top: 0;
    left: 0;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
`;

const StyledFaHeart = styled(FaHeart)`
  color: #f75d19;
  margin-top: 1em;
  margin-right: 0.75em;
  transition: 500ms;
  cursor: pointer;
  &:hover {
    color: #f1f1f2;
  }
`;

const StyledFaRegHeart = styled(FaRegHeart)`
  color: #a3a3a3;
  margin-top: 1em;
  margin-right: 0.75em;
  transition: 500ms;
  cursor: pointer;
  &:hover {
    color: #f75d19;
  }
`;

const StyledText = styled(Text)`
  margin-top: 1em;
  margin-right: 0.75em;
  display: none;
  @media (max-width: 920px) {
    display: block;
  }
`;

const StyledImageDiv = styled.div`
  margin: 2em auto;
  display: flex;
  justify-content: center;
  @media (max-width: 780px) {
    margin: 0 auto;
  }
`;

function ShareBar({ favorite, handleFavorite, shareUrl, title }) {
  return (
    <ShareBarWrapper>
      <StyledText smalltitle>Share or favorite:</StyledText>
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        style={{
          marginTop: "1em",
          marginRight: ".75em",
          outline: "none",
          cursor: "pointer"
        }}
      >
        <FaFacebook size="1.25em" color="#a3a3a3" />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        quote={title}
        style={{
          marginTop: "1em",
          marginRight: ".75em",
          outline: "none",
          cursor: "pointer"
        }}
      >
        <FaTwitter size="1.25em" color="#a3a3a3" />
      </TwitterShareButton>
      <WhatsappShareButton
        url={shareUrl}
        quote={title}
        style={{
          marginTop: "1em",
          marginRight: ".75em",
          outline: "none",
          cursor: "pointer"
        }}
      >
        <FaWhatsappSquare size="1.25em" color="#a3a3a3" />
      </WhatsappShareButton>
      {favorite && <StyledFaHeart onClick={handleFavorite} size="1.25em" />}
      {!favorite && <StyledFaRegHeart onClick={handleFavorite} size="1.25em" />}
    </ShareBarWrapper>
  );
}

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
    isFetchingItem: true,
    favorite: false
  };

  async componentDidMount() {
    const { fetchItem } = this.props;
    const itemId = this.props.match.params.id;
    let favorite = await this.handleFetchFavorite(itemId);
    fetchItem(itemId).then(() => {
      this.setState({ isFetchingItem: false, favorite });
    });
  }

  handleFetchFavorite = async itemId => {
    try {
      const favorites = await this.props.fetchFavorite();

      if (favorites.favorites.favorites.includes(itemId)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleFavorite = () => {
    const { favorite } = this.state;
    const itemName = this.props.location.state.itemName;
    const itemId = this.props.match.params.id;
    let fav = favorite;
    if (!fav) {
      this.props.addFavorite({ itemId });
      this.props.showMessage("favorites", {
        type: "MESSAGE",
        message: [
          "Success",
          `You successfully added ${itemName} to your favorites!`
        ]
      });
      this.setState({ addedFavorite: true });
    } else {
      this.props.deleteFavorite({ itemId });
    }
    this.setState({
      favorite: !fav
    });
  };

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

  handleAddItem = (itemId, count) => {
    const itemName = this.props.location.state.itemName;
    let data = {
      itemQuantity: count
    };
    this.props.addItemToCart(itemId, data).then(action => {
      if (action.type === POST_ITEM_TO_CART.SUCCESS) {
        this.props.showMessage("cart", {
          type: "MESSAGE",
          message: [
            "Success",
            `You successfully added ${itemName} to your basket!`
          ]
        });
        this.setState({ count: 0, addedItem: true });
      } else {
        console.log("error");
      }
    });
  };

  render() {
    const marketName =
      this.props.location.state.marketName || "Statesboro Farmer's Market";
    const marketId = this.props.location.state.marketId || "market-D3EC";
    const itemName = this.props.location.state.itemName;
    const { item, farmId, userFarmId } = this.props;
    const { isFetchingItem, favorite } = this.state;
    const attributesArr = this.handleAttributes(
      item.getIn(["item", "attributes"], "")
    );
    const lat = item.getIn(["farm", "location", "coordinates", 0]);
    const lng = item.getIn(["farm", "location", "coordinates", 1]);

    return (
      <div>
        <Navigation />
        <StyledImageDiv>
          <SplashImage
            background={`url('${item.getIn(["item", "images", 0], "")}')`}
          />
        </StyledImageDiv>

        <Div>
          <div>
            <Link to={`/market/${marketId}`}>
              <Text orange margin=".5em 0 .25em 0">
                {`Explore Markets / ${marketName}`}
              </Text>
            </Link>
            <Title>{`${itemName} from ${item.getIn(
              ["farm", "city"],
              ""
            )}`}</Title>
            <Row alignitems="center">
              <Avatar
                large
                type="farmer"
                farmerAvatar={`${item.getIn(["farm", "farmer", "avatar"], "")}`}
                farmerFirstName={`${item.getIn(
                  ["farm", "farmer", "firstName"],
                  ""
                )}`}
                farmerLastName={`${item.getIn(
                  ["farm", "farmer", "lastName"],
                  ""
                )}`}
              />
              <div>
                <Text margin="0" smalltitle>{`${item.getIn(
                  ["farm", "farmer", "firstName"],
                  ""
                )} ${item.getIn(["farm", "farmer", "lastName"], "")}`}</Text>
                <Text margin="0" orange>{`${item.getIn(
                  ["farm", "farmName"],
                  ""
                )}`}</Text>
              </div>
            </Row>
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
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_RzaeDKWkj0MoJn3oaNPaqOWaXAwDr5I&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<MapDiv />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={lat}
            lng={lng}
          />
        )}
        <ShareBar
          shareUrl={`https://market.urbancrop.io/product/${item.getIn(
            ["item", "itemId"],
            ""
          )}`}
          title={`Buy ${itemName} from ${item.getIn(["farm", "farmName"], "")}`}
          favorite={favorite}
          handleFavorite={this.handleFavorite}
        />
        {userFarmId && userFarmId === farmId && (
          <FarmerBar navigate={this.props.history} />
        )}
        {!userFarmId && (
          <PurchaseBar
            cost={item.getIn(["item", "cost"], "")}
            quantity={item.getIn(["item", "quantity"], "")}
            unit={item.getIn(["item", "unit"], "")}
            formatPrice={this.formatPrice}
            count={item.getIn(["item", "images", 0], "")}
            handleAddItem={this.handleAddItem}
            itemId={item.getIn(["item", "itemId"], "")}
          />
        )}
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    item: state => getItem(state),
    farmId: state => getFarmId(state),
    userFarmId: state => getUserFarmId(state)
  }),
  {
    fetchItem,
    fetchFavorite,
    addFavorite,
    deleteFavorite,
    addItemToCart,
    showMessage
  }
)(Listing);
