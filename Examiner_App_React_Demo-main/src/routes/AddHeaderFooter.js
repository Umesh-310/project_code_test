import React, { useState } from "react";
import { Footer, Header, Sidebar } from "../components";

const AddHeaderFooter = ({ siderBar = false, children }) => {
  const [drawer, setDrawer] = useState(true);
  const handleDrawer = () => setDrawer((p) => !p);
  const closeDrawer = () => setDrawer(false);
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header showDrawerIcon={siderBar} handleDrawer={handleDrawer} />
      {siderBar && <Sidebar toggle={drawer} closeDrawer={closeDrawer} />}
      {children}
      <Footer />
    </div>
  );
};

export default AddHeaderFooter;
