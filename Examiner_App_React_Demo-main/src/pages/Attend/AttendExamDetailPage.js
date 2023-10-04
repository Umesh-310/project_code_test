import React, { useEffect } from "react";
import { AttendExamDetail } from "../../components";
import Smartlook from "smartlook-client";
const AttendExamDetailPage = () => {
  Smartlook.pause();
  //////////////////////////
  // useEffect(() => {
  //   if (window !== "undefined" && window.sessionRewind !== "undefined") {
  //     window.sessionRewind.stopSession();
  //   }
  // }, []);
  return (
    <>
      <AttendExamDetail />
    </>
  );
};

export default AttendExamDetailPage;
