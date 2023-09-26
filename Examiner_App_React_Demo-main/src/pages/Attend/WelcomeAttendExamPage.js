import React from "react";
import { WelcomeAttendExam } from "../../components";
import Smartlook from "smartlook-client";

const WelcomeAttendExamPage = () => {
  Smartlook.pause();
  return (
    <>
      <WelcomeAttendExam />
    </>
  );
};

export default WelcomeAttendExamPage;
