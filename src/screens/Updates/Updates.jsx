import React, { Component } from "react";
import { Layout, Empty } from "../../shared-components";
import updates from "../../assets/updates.jpg";

class Updates extends Component {
  render() {
    return (
      <Layout title="Product Updates">
        <Empty
          image={updates}
          title="We'll let you know when we add features!"
        />
      </Layout>
    );
  }
}

export default Updates;
