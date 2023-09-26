import React from "react";
import { AttendExamDetail } from "../../components";
import Smartlook from "smartlook-client";
const AttendExamDetailPage = () => {
  Smartlook.pause();
  return (
    <>
      <AttendExamDetail />
    </>
  );
};

export default AttendExamDetailPage;
