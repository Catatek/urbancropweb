import React from "react";
import styled from "styled-components";

import Navigation from "./Navigation";
import { HeroImage } from "./HeroImage";
import { Footer } from "./Footer";

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 2em;
  height: 100%;
  min-height: calc(100vh - 280px);
  @media (max-width: 920px) {
  }
`;

export function Layout({ title, children, icon }) {
  return (
    <div>
      <Navigation />
      <HeroImage title={title} icon={icon} />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </div>
  );
}
