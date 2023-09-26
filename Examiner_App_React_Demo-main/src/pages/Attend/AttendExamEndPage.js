import React from "react";
import { AttendExamEnd } from "../../components";
import Smartlook from "smartlook-client";

const AttendExamEndPage = () => {
  Smartlook.pause();
  return (
    <>
      <AttendExamEnd />
    </>
  );
};

export default AttendExamEndPage;
