import React from "react";
import { SignUpSide } from "../../components";
import AuthTheme from "../../utils/AuthTheme";

const SignUpPage = () => {
  return (
    <>
      <AuthTheme>
        {/* <Header /> */}
        <SignUpSide />
      </AuthTheme>
    </>
  );
};

export default SignUpPage;
