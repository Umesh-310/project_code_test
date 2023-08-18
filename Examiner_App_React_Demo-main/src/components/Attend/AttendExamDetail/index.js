import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { toast } from "react-toastify";

import { loadCookies } from "../../../utils/Cookies";
import { endAttendExam, getRemainTime } from "../../../store/remainTimeSlice";
import PageTitle from "./PageTitle";
import LeftInstruction from "./LeftInstruction";

const AttendExamDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const attendExamId = params.id;
  const [data, setData] = useState();
  const [attendQuestions, setAttendQuestions] = useState([]);
  const [exam, setExam] = useState();

  const recorder = useSelector((state) => state.remainTime.recorder);
  const stream = useSelector((state) => state.remainTime.stream);
  const pasteCount = useSelector((state) => state.remainTime.pasteCount);
  const remainTime = useSelector((state) => state.remainTime.remainTime);

  const getAttendExamDetail = async () => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExamId}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/attendee/get_single_attend_exam/${attendExamId}`,
        { headers },
      );
      if (response.status === 200) {
        if (response?.data?.data?.is_submited) {
          navigate(`/attend/attend_exam_end/${attendExamId}`, {
            replace: true,
          });
        }
        setData(response?.data?.data);
        setAttendQuestions(response?.data?.data?.attend_questions);
        setExam(response?.data?.data?.exam);

        if (response?.data?.data?.exam?.is_time_limit === true) {
          await getRemainTime(
            dispatch,
            navigate,
            response?.data?.data,
            response?.data?.data?.exam,
            recorder,
            stream,
            pasteCount,
          );
        }
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      navigate(`/attend/attend_exam_end/${attendExamId}`, { replace: true });
    }
  };

  const endAttendExamHandler = async () => {
    await endAttendExam(
      dispatch,
      navigate,
      attendExamId,
      recorder,
      stream,
      pasteCount,
    );
  };

  useEffect(() => {
    getAttendExamDetail();
  }, []);

  useEffect(() => {
    if (exam?.is_time_limit) {
      const interval = setInterval(() => {
        getRemainTime(
          dispatch,
          navigate,
          data,
          exam,
          recorder,
          stream,
          pasteCount,
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [remainTime]);

  return (
    <div className="row custom-main" style={{ margin: "50px" }}>
      <div className="col-lg-1"></div>
      <div className="col-lg-10">
        <div className="card">
          <div className="card-body">
            <PageTitle data={exam} />
            <div className="card-body pt-3">
              <div className="row">
                <div className="col-md-3">
                  <LeftInstruction
                    exam={exam}
                    endAttendExamHandler={endAttendExamHandler}
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-8">
                  <div className="pagetitle">
                    <h1>Questions</h1>
                  </div>
                  <hr />
                  {attendQuestions.map((attendQuestion) => {
                    return (
                      <div
                        className="card text-center"
                        style={{}}
                        key={attendQuestion?.id}
                      >
                        <div className="card-body">
                          <div className="row m-0">
                            <div className="col-md-4">
                              <h5 className="card-text">
                                {attendQuestion?.question?.title}
                              </h5>
                            </div>
                            <div className="col-md-4">
                              {attendQuestion?.question?.level === "Easy" ? (
                                <h5
                                  className="card-text badge bg-success"
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {attendQuestion?.question?.level}
                                </h5>
                              ) : attendQuestion?.question?.level ===
                                "Medium" ? (
                                <h5
                                  className="card-text badge bg-warning"
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {attendQuestion?.question?.level}
                                </h5>
                              ) : attendQuestion?.question?.level === "Hard" ? (
                                <h5
                                  className="card-text badge bg-danger"
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {attendQuestion?.question?.level}
                                </h5>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-md-4">
                              {attendQuestion?.is_submited ? (
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  disabled
                                >
                                  Submmited
                                </button>
                              ) : (
                                <Link
                                  type="button"
                                  className="btn btn-outline-primary"
                                  to={`/attend/attend_question_editor/${attendQuestion.id}`}
                                >
                                  Begin Challenge
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

export default AttendExamDetail;
