import React from "react";
import { ForgotPasswordSide, Header } from "../../components";
import AuthTheme from "../../utils/AuthTheme";

const ForgotPasswordPage = () => {
  return (
    <>
      <AuthTheme>
        <Header />
        <ForgotPasswordSide />
      </AuthTheme>
    </>
  );
};

export default ForgotPasswordPage;
