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
import { dataSelector } from "../../store/selectors/data";
import noPesticides from "../../assets/pesticide-free.png";
import organic from "../../assets/organic.png";
import local from "../../assets/vegan.png";
import vegetarian from "../../assets/vegetarian.png";
import noGmo from "../../assets/gmo-free.png";
import Map from "./Map";
import Avatar from "../../shared-components/Avatar";
import { PurchaseBar } from "../../shared-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";

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
  }
  @media (max-width: 500px) {
    height: 350px;
  }
`;

const SideBarWrapper = styled.div`
  position: fixed;
  left: 15%;
  top: 50%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 920px) {
    display: none;
  }
`;

const IconDiv = styled.div`
  //   width: 42px;
  //   height: 42px;
  //   border-radius: 50%;
  //   background: #f1f1f2;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   transition: 500ms;
  //   cursor: pointer;
  //   &:hover {
  //     background-color: #fff;
  //     box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  //   }
  //
`;

const StyledFaHeart = styled(FaHeart)`
  color: #f75d19;
  margin-top: 1em;
  transition: 500ms;
  cursor: pointer;
  &:hover {
    color: #f1f1f2;
  }
`;

const StyledFaRegHeart = styled(FaRegHeart)`
  color: #000;
  margin-top: 1em;
  transition: 500ms;
  cursor: pointer;
  &:hover {
    color: #f75d19;
  }
`;

// const BasketSvg = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="23"
//     height="21"
//     viewBox="0 0 24 22"
//   >
//     <g fill="none" fillRule="evenodd" stroke={"#f75d19"}>
//       <path d="M4.05 8l6-8M19.05 8l-5-8" />
//       <path strokeLinecap="square" d="M17.55 21H6.45L1.05 8h22z" />
//     </g>
//   </svg>
// );

function SideBar({ favorite, handleFavorite }) {
  return (
    <SideBarWrapper>
      {/* <IconDiv>
        <BasketSvg />
      </IconDiv> */}
      {favorite && <StyledFaHeart onClick={handleFavorite} size="1.25em" />}
      {!favorite && <StyledFaRegHeart onClick={handleFavorite} size="1.25em" />}
    </SideBarWrapper>
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
    const itemId = this.props.match.params.id;
    let fav = favorite;
    if (!fav) {
      this.props.addFavorite({ itemId });
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
    let data = {
      itemQuantity: count
    };
    this.props.addItemToCart(itemId, data).then(action => {
      if (action.type === POST_ITEM_TO_CART.SUCCESS) {
        this.setState({ count: 0, addedItem: true });
      } else {
        console.log("error");
      }
    });
  };

  render() {
    const marketName = this.props.location.state.marketName;
    const marketId = this.props.location.state.marketId;
    const itemName = this.props.location.state.itemName;
    const { item } = this.props;
    const { isFetchingItem, favorite } = this.state;
    const attributesArr = this.handleAttributes(
      item.getIn(["item", "attributes"], "")
    );
    const lat = item.getIn(["farm", "location", "coordinates", 0]);
    const lng = item.getIn(["farm", "location", "coordinates", 1]);

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
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAe6xsQwAD0242Km-Dvf_fIXq5OlMVMuXA&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<MapDiv />}
            mapElement={<div style={{ height: `100%` }} />}
            lat={lat}
            lng={lng}
          />
        )}
        <SideBar favorite={favorite} handleFavorite={this.handleFavorite} />
        <PurchaseBar
          cost={item.getIn(["item", "cost"], "")}
          quantity={item.getIn(["item", "quantity"], "")}
          unit={item.getIn(["item", "unit"], "")}
          formatPrice={this.formatPrice}
          count={item.getIn(["item", "images", 0], "")}
          handleAddItem={this.handleAddItem}
          itemId={item.getIn(["item", "itemId"], "")}
        />
      </div>
    );
  }
}

export default connect(
  dataSelector,
  { fetchItem, fetchFavorite, addFavorite, deleteFavorite, addItemToCart }
)(Listing);
