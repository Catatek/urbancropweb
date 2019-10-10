import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchFarmItems } from "../../store/actions/data";
import { fetchFarm } from "../../store/actions/auth";
import Item from "../../shared-components/Item";
import { Layout, Empty } from "../../shared-components";
import { Title } from "../../theme";
import { getInventory } from "../../store/selectors/data";
import cat from "../../assets/cat1.png";
import { getUserFarmId } from "../../store/selectors/auth";
import { createStructuredSelector } from "reselect";

const Div = styled.div`
  width: 85%;
  margin: 0 auto;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  @media (max-width: 920px) {
    width: 90%;
    margin-top: 2em;
  }
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 5px 75px;
  max-width: 1300px;
  margin: 1em auto 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-auto-rows: auto;
  @media (max-width: 920px) {
    grid-auto-rows: auto;
    width: 100%;
    margin-bottom: 2em;
  }
`;

class Inventory extends Component {
  state = {
    isLoadingItems: true
  };

  componentDidMount() {
    const { farmId, fetchFarm, fetchFarmItems } = this.props;
    fetchFarm(farmId);
    fetchFarmItems(farmId).then(() => {
      this.setState({ isLoadingItems: false });
    });
  }

  componentDidUpdate(prevProps) {
    const { farmId, fetchFarm, fetchFarmItems } = this.props;
    if (prevProps.farmId !== farmId) {
      fetchFarm(farmId);
      fetchFarmItems(farmId).then(() => {
        this.setState({ isLoadingItems: false });
      });
    }
  }

  formatPrice = x => {
    return (x / 100).toFixed(2);
  };

  render() {
    const { inventory } = this.props;
    const { isLoadingItems } = this.state;

    return (
      <Layout title="Inventory">
        {!isLoadingItems && inventory.size === 0 && (
          <Empty image={cat} title="You do not have any inventory!" />
        )}
        {!isLoadingItems && inventory.size > 0 && (
          <Div>
            <Title>Inventory</Title>
            <Grid>
              {inventory.map((key, index) => {
                return (
                  <Item
                    key={index}
                    images={key.getIn(["images", 0], 0)}
                    itemName={key.get("itemName")}
                    description={key.get("description")}
                    cost={this.formatPrice(key.get("cost", 0))}
                    unit={key.get("unit")}
                    navigation={this.props.history}
                    itemId={key.get("itemId")}
                    quantity={key.get("quantity", 0)}
                    type="inventory"
                  />
                );
              })}
            </Grid>
          </Div>
        )}
      </Layout>
    );
  }
}

export default connect(
  createStructuredSelector({
    farmId: state => getUserFarmId(state),
    inventory: state => getInventory(state)
  }),
  { fetchFarmItems, fetchFarm }
)(Inventory);
