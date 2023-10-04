import React, { useEffect } from "react";
import { AttendExamEnd } from "../../components";
import Smartlook from "smartlook-client";

const AttendExamEndPage = () => {
  Smartlook.pause();
  //////////////////////////
  // useEffect(() => {
  //   if (window !== "undefined" && window.sessionRewind !== "undefined") {
  //     window.sessionRewind.stopSession();
  //   }
  // }, []);
  return (
    <>
      <AttendExamEnd />
    </>
  );
};

export default AttendExamEndPage;
