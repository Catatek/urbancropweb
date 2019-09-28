import React, { Component } from "react";
import styled from "styled-components";
import Navigation from "../../shared-components/Navigation";
import { HeroImage, Empty } from "../../shared-components";
import updates from "../../assets/updates.jpg";

class Updates extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <HeroImage title="Product Updates" />
        <Empty
          image={updates}
          title="We'll let you know when we add features!"
        />
      </div>
    );
  }
}

export default Updates;
