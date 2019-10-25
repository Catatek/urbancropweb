import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchItems,
  addItemToCart,
  fetchFilteredItems
} from "../../store/actions/data";
import Item from "../../shared-components/Item";
import { SearchBar, Layout } from "../../shared-components/index";
import { Title, Text, Column, Row } from "../../theme";
import { dataSelector } from "../../store/selectors/data";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { categoriesFilterData } from "../../fixtures/categorieData";
import { Formik } from "formik";

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  @media (max-width: 920px) {
    width: 90%;
    margin-top: 2em;
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

const StyledCategoryImage = styled.img`
  width: ${props => props.imagewidth};
  height: ${props => props.imageheight};
  margin-bottom: 4px;
`;

const StyledCategoryText = styled(Text)`
  color: ${props => props.textcolor || "#fff"};
  font-weight: 600;
  text-transform: capitalize;
  margin: 0;
`;

const FilterDiv = styled.div`
  width: 100%;
  background: rgba(142, 142, 147, 0.12);
  height: 65px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media (max-width: 780px) {
    display: none;
  }
`;

const InnerFilterDiv = styled.div`
  width: 85%;
  margin: 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: 780px) {
    display: none;
  }
`;

function Category({
  setFieldValue,
  values,
  activeIcon,
  icon,
  label,
  width,
  height,
  submitForm
}) {
  return (
    <Column alignitems="center" style={{ cursor: "pointer" }}>
      <StyledCategoryImage
        onClick={async () => {
          if (values === label) {
            setFieldValue("category", "");
          } else {
            setFieldValue("category", label);
          }
          await Promise.resolve();
          submitForm();
        }}
        src={values === label ? activeIcon : icon}
        imagewidth={`${width * 0.75}px`}
        imageheight={`${height * 0.75}px`}
      />
      <StyledCategoryText textcolor={values === label ? "#f75d19" : "#A3A3A3"}>
        {label}
      </StyledCategoryText>
    </Column>
  );
}

class Market extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { fetchItems, location, addItemToCart } = this.props;
    const addToBasketState = location.state && location.state.addToBasketState;
    const marketId = this.props.match.params.id || "market-D3EC";
    fetchItems(marketId).then(() => {
      this.setState({ isFetchingMarkets: false });
    });
    if (addToBasketState) {
      let data = {
        itemQuantity: addToBasketState.count
      };
      let sku = addToBasketState.itemId;
      addItemToCart(sku, data).then(() => {
        console.log("HERE");
      });
    }
  }

  calcQuantity = quantity => {
    if (quantity === 1) {
      return `${quantity} product available`;
    } else {
      return `${quantity} products available`;
    }
  };

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  handleChange = query => {
    this.setState({ query }, () => {
      this.filterProducts(query);
    });
  };

  filterProducts = query => {
    const items = this.props.items.toArray();
    if (query) {
      let filteredItems = items.filter(item => {
        let itemName = item.getIn(["item", "itemName"], "").toLowerCase();
        return itemName.indexOf(query.toLowerCase()) !== -1;
      });
      return filteredItems;
    } else {
      return items;
    }
  };

  handleFilterItemsParams = values => {
    const marketId = this.props.match.params.id;
    this.setState({ isFetchingItems: true });
    if (values.category === "" || values.attributes.length === 0) {
      this.props.fetchItems(marketId).then(() => {
        this.filterProducts();
        this.setState({ isFetchingItems: false });
      });
    } else {
      this.props
        .fetchFilteredItems(marketId, { filter: values })
        .then(action => {
          this.setState({
            // category: values.category,
            // attributes: values.attributes,
            isFetchingItems: false
          });
        });
    }
  };

  render() {
    const { query } = this.state;
    const marketName = "Statesboro Farmer's Market";
    const marketId = this.props.match.params.id;
    const searchProducts = this.filterProducts(query);
    const productCount = this.calcQuantity(searchProducts.length);

    return (
      <Layout title={marketName} icon>
        <Formik
          enableReinitialize
          initialValues={{
            category: "",
            attributes: [
              "Non GMO",
              "Organic",
              "Local",
              "No Pesticides",
              "Vegetarian"
            ]
          }}
          onSubmit={values => {
            this.handleFilterItemsParams(values);
          }}
          render={({ values, setFieldValue, submitForm }) => (
            <FilterDiv>
              <InnerFilterDiv>
                {categoriesFilterData.map((key, index) => {
                  return (
                    <Category
                      key={index}
                      label={key.label}
                      activeIcon={key.activeIcon}
                      icon={key.icon}
                      setFieldValue={setFieldValue}
                      values={values.category}
                      width={key.width}
                      height={key.height}
                      submitForm={submitForm}
                    />
                  );
                })}
              </InnerFilterDiv>
            </FilterDiv>
          )}
        />

        <Div>
          <TitleDiv>
            <Link to="/">
              <Row alignitems="center" style={{ margin: ".5em 0 .25em 0" }}>
                <IoIosArrowBack color="#f75d19" />
                <Text orange margin="0">{`Explore Markets`}</Text>
              </Row>
            </Link>
            <Title margin="0">Products</Title>
            <Text margin=".5em 0 0 0">{productCount}</Text>
          </TitleDiv>
          <SearchBar
            placeholder="Search Products"
            handleChange={this.handleChange}
            query={query}
          />
        </Div>
        <Grid>
          {searchProducts &&
            searchProducts.map((key, index) => {
              return (
                <Item
                  key={index}
                  marketName={marketName}
                  unit={key.getIn(["item", "unit"])}
                  quantity={key.getIn(["item", "quantity"])}
                  cost={this.formatPrice(key.getIn(["item", "cost"], 0))}
                  itemId={key.getIn(["item", "itemId"])}
                  attributes={key.getIn(["item", "attributes"])}
                  images={key.getIn(["item", "images", 0], 0)}
                  itemName={key.getIn(["item", "itemName"], "")}
                  category={key.getIn(["item", "category"], "")}
                  navigation={this.props.navigation}
                  farmName={key.getIn(["farm", "farmName"], "")}
                  farmId={key.getIn(["farm", "farmId"], "")}
                  history={this.props.history}
                  marketId={marketId}
                />
              );
            })}
        </Grid>
      </Layout>
    );
  }
}

export default connect(
  dataSelector,
  { fetchItems, addItemToCart, fetchFilteredItems }
)(Market);
