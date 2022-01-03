import React from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
} from "carbon-components-react";

const HeaderSection = () => {
  return (
    <Header aria-label="IBM Map My Shifter">
      <HeaderName href="/" prefix="IBM">
        Map My Shifter
      </HeaderName>
      <HeaderNavigation aria-label="navigation">
        <HeaderMenuItem href="/from_stix">From STIX</HeaderMenuItem>
        <HeaderMenuItem href="/to_stix">To STIX</HeaderMenuItem>
        <HeaderMenuItem href="/about">About</HeaderMenuItem>
      </HeaderNavigation>
    </Header>
  );
};

export default HeaderSection;
