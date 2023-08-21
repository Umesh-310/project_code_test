import React from "react";
import { Footer, Header } from "../components";

const AddHeaderFooter = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AddHeaderFooter;
