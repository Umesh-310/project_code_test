import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loadCookies } from "../../../utils/Cookies";

import AdbIcon from "@mui/icons-material/Adb";
import { startRecording } from "../../../store/remainTimeSlice";
import { useDispatch } from "react-redux";
import { SET_EXAM_ID } from "../../../store/answerSlice";

const WelcomeAttendExam = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const examId = params.id;
  const [data, setData] = useState();
  const navigate = useNavigate();

  const getExamDetail = async () => {
    try {
      const response = await axios.get(
        `/api/examiner/get_single_exam/${examId}`
      );
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const createAttendExamHandler = async (body) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${examId}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const body = {
        exam: data.id,
      };
      const response = await axios.post(
        `/api/attendee/register_for_attend_exam/`,
        body,
        { headers }
      );

      if (response.status === 201) {
        if (response?.data?.data?.extra?.start_now) {
          const attendExamId = response?.data?.data?.data.id;
          dispatch(SET_EXAM_ID(attendExamId));
          // await startRecording(dispatch);
          navigate(`/attend/attend_exam_detail/${attendExamId}`, {
            replace: true,
          });
        } else {
          navigate(`/attend_exam/check_start_exam/${examId}`, {
            replace: true,
          });
        }
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
                <div className="col-md-4">
                  <div className="row">
                    {data?.is_time_limit ? (
                      <span className="text-secondary">
                        Time Limit
                        <br />
                        <span style={{ fontWeight: "bold" }}>
                          {data?.time_limit_hour} hours,{" "}
                          {data?.time_limit_minute} minutes
                        </span>
                      </span>
                    ) : (
                      <span className="text-secondary">No Time Limit</span>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="m-3">
                    <div className="row mb-3">
                      <h5
                        className="text-secondary p-0"
                        style={{ fontWeight: "bold" }}
                      >
                        Welcome to Your CoderTest Assessment. Try and Solve the
                        challenges and answer the questions with this assessment
                        to the best of your ability. Good Luck!
                      </h5>
                    </div>
                    <div className="row mb-0">
                      <h5
                        className="text-danger p-0"
                        style={{ fontWeight: "bold" }}
                      >
                        Important : Please Select Entire Screen Option to start
                        screen recording.
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <h5
                        className="text-danger p-0"
                        style={{ fontWeight: "bold" }}
                      >
                        Please DO NOT STOP sharing screen throughout
                        Assesment!!!
                      </h5>
                    </div>
                    <div className="row mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={createAttendExamHandler}
                        style={{ width: "200px" }}
                      >
                        Begin Assessment
                      </button>
                    </div>
                    <div className="row mb-3">
                      <h6 className="text-secondary p-0">
                        Once you begin this assessment you will need to complete
                        all of the challenges and answer all of the questions
                        with the Time Limit
                      </h6>
                    </div>
                  </div>
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

export default WelcomeAttendExam;
