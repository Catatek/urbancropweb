import React, { Component } from "react";
import { Layout } from "../../shared-components";
import AddItemForm from "./AddItemForm";

class AddItem extends Component {
  render() {
    return (
      <Layout title="Add an item">
        <AddItemForm {...this.props} />
      </Layout>
    );
  }
}

export default AddItem;
