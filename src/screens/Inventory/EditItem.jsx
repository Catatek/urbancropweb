import React, { Component } from "react";
import { Layout } from "../../shared-components";
import EditItemForm from "./EditItemForm";

class EditItem extends Component {
  render() {
    const { itemName } = this.props.location.state;
    const itemId = this.props.match.params.id;

    return (
      <Layout title={`Edit ${itemName}`}>
        <EditItemForm itemId={itemId} history={this.props.history} />
      </Layout>
    );
  }
}

export default EditItem;
