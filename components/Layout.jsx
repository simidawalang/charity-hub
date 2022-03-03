import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
