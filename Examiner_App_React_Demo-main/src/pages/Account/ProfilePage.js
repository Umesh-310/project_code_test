import React from "react";
import { Profile, Sidebar } from "../../components";

const ProfilePage = () => {
  return (
    <>
      {/* <Header /> */}
      <Sidebar />
      <Profile style={{ height: "100vh" }} />
      {/* <Footer /> */}
    </>
  );
};

export default ProfilePage;
