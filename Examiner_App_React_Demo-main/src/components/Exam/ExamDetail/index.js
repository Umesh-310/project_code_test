import React, { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

import PageTitle from "./PageTitle";
import { loadCookies } from "../../../utils/Cookies";
import ExamLinkMailCard from "./ExamLinkMailCard";
import ExamDetailCard from "./ExamDetailCard";

const AttendExamAttendeeTable3 = lazy(() =>
  import("./AttendExamAttendeeTable3"),
);

const ExamDetail = () => {
  const params = useParams();
  const examId = params.id;
  const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();

  const csvHeaders = [
    { label: "Name", key: "attendee.name" },
    { label: "Email", key: "attendee.email" },
    { label: "Status", key: "status" },
    { label: "Percent Mark", key: "percent_mark" },
  ];

  const getExamDetail = async () => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/examiner/get_single_exam_by_examiner/${examId}`,
        { headers },
      );
      if (response.status === 200) {
        setData(response.data.data);
        setCsvData(response.data.data?.attend_exam);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const onExamUpdateHandler = async (body) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      let response;
      response = await axios.put(
        `/api/examiner/update_exam/${body.id}/`,
        body,
        { headers },
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const onExamLinkMailHanlder = async (body) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      let response;
      response = await axios.post(
        `/api/examiner/mail_exam_link/${body.id}/`,
        body,
        { headers },
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getExamDetail();
  }, []);

  return (
    <>
      <main id="main" className="main">
        <PageTitle examId={examId} />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-md-4">
                  <h4 style={{ fontWeight: "bold" }}>{data.title}</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <ExamLinkMailCard
                    data={data}
                    onExamLinkMailHanlder={onExamLinkMailHanlder}
                  />
                </div>
                <div className="col-md-6">
                  <ExamDetailCard data={data} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="pb-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h4>Attendee Detail</h4>
              <CSVLink
                data={csvData}
                headers={csvHeaders}
                className="btn btn-primary"
              >
                Download CSV
              </CSVLink>
            </div>
            <div
              className="row"
              style={{ textAlign: "center", margin: 0, padding: 0 }}
            >
              {data?.attend_exam?.length > 0 ? (
                <>
                  <Suspense fallback={<div>Loading</div>}>
                    <AttendExamAttendeeTable3 data={data?.attend_exam} />
                  </Suspense>
                </>
              ) : (
                <h6>No Attendee Found</h6>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ExamDetail;
