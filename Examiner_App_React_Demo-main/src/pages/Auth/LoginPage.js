import React from "react";
import { SignInSide } from "../../components";
import AuthTheme from "../../utils/AuthTheme";

const LoginPage = () => {
  return (
    <>
      <AuthTheme>
        {/* <Header /> */}
        <SignInSide />
      </AuthTheme>
    </>
  );
};

export default LoginPage;
