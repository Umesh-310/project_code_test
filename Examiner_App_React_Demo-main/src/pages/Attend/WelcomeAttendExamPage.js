import React, { useEffect } from "react";
import { WelcomeAttendExam } from "../../components";
import Smartlook from "smartlook-client";

const WelcomeAttendExamPage = () => {
  Smartlook.pause();
  ////////////////////////////////////////////
  // useEffect(() => {
  //   if (window !== "undefined" && window.sessionRewind !== "undefined") {
  //     window.sessionRewind.stopSession();
  //   }
  // }, []);
  return (
    <>
      <WelcomeAttendExam />
    </>
  );
};

export default WelcomeAttendExamPage;
