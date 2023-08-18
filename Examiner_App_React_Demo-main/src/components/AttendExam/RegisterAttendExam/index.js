import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import AdbIcon from "@mui/icons-material/Adb";
import RegisterForm from "./RegisterForm";
import { saveCookies } from "../../../utils/Cookies";

const RegisterAttendExam = () => {
  const navigate = useNavigate();
  const params = useParams();
  const examId = params.id;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkStartExamFun = async () => {
    try {
      const response = await axios.get(
        `/api/attendee/check_for_exam_start/${examId}`,
      );
      if (response.status === 200) {
        setData(response.data.data);
        if (response?.data?.data?.extra?.start_now) {
          navigate(`/attend_exam/register_attend_exam/${examId}`);
        } else {
          navigate(`/attend_exam/check_start_exam/${examId}`);
        }
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      toast.error("Exam NOT Found");
      navigate(`/attend_exam/check_start_exam/${examId}`);
    }
  };

  const getExamDetail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/examiner/get_single_exam/${examId}`,
      );
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
    setIsLoading(false);
  };

  const registerAttendeeHandler = async (body) => {
    try {
      const response = await axios.post(
        `/api/account/register_attendee/`,
        body,
      );
      if (response.status === 201) {
        saveCookies("access_token", response.data.token.access);
        navigate(`/attend/welcome_attend_exam/${examId}`, { replace: true });
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkStartExamFun();
    getExamDetail();
  }, []);

  return (
    <div className="row custom-main" style={{ margin: "50px" }}>
      <div className="col-lg-1"></div>
      <div className="col-lg-10">
        <div className="card">
          <div className="card-body">
            <div
              className="card-title"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <Link
                    to={process.env.REACT_APP_BASE_URL}
                    className="logo d-flex align-items-center"
                  >
                    {/* <img src="assets/img/logo.png" alt=""/> */}
                    <AdbIcon
                      sx={{
                        display: { xs: "none", md: "flex" },
                        mr: 1,
                        color: "#0c1f4d",
                      }}
                    />
                    <span className="d-none d-lg-block">CoderTest</span>
                  </Link>
                </div>
              </div>
              <div>
                <span className="d-none d-lg-block">Created By</span>
                {data?.created_by?.name}
              </div>
            </div>
            <div className="card-body pt-3">
              <div className="row">
                <div className="col-md-6">
                  <RegisterForm
                    exam={data}
                    registerAttendeeHandler={registerAttendeeHandler}
                  />
                </div>
                <div className="col-md-6">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/img/attend_exam_register_bg.jpg"
                    }
                    alt="..."
                    style={{ height: "500px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-1"></div>
    </div>
  );
};

export default RegisterAttendExam;
