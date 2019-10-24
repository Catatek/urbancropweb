import React, { Component } from "react";
import { Layout, Empty } from "../../shared-components";
import cat1 from "../../assets/cat1.png";

class MarketTransactions extends Component {
  render() {
    return (
      <Layout title="Transactions">
        <Empty
          image={cat1}
          title="Your market does not have any transactions yet!"
        />
      </Layout>
    );
  }
}

export default MarketTransactions;
