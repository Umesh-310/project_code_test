import React, { useCallback, useEffect, useState } from "react";
import PageTitlesCreate from "../../../utils/PageTitlesCreate";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loadCookies } from "../../../utils/Cookies";
import { Box, Button, Tab, Tabs, Tooltip } from "@mui/material";
import CustomTabPanel from "../../../utils/CustomTabPanel";
import ExamSetting from "./ExamSetting";
import { ButtonCss } from "../../../utils/utils";
import EditExamChallenges from "./EditExamChallenges";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EditExam = (props) => {
  // const { row } = props;
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [exam, setExam] = useState({
    id: "",
    title: "",
    description: "",
    passing_percent_mark: 0,
    total_question: 0,
    is_time_limit: false,
    is_date_limit: false,
    time_limit_hour: 0,
    time_limit_minute: 0,
    start_time: null,
    end_time: null,
    questions: [],
    is_active: false,
    is_deleted: false,
    allow_redo_exam: null,
  });
  const [isTimeLimit, setIsTimeLimit] = useState(false);
  const [selectedQue, setSelectedQue] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const examId = params.id;
  const breadcrumb = [
    { url: "/account/dashboard", title: "Home" },
    { url: "/exam/all_exam", title: "Exams" },
    {
      url: `/exam/exam_detail/${examId}`,
      title: "Exam Detail",
    },
    {
      url: `/exam/exam_detail/${examId}/edit`,
      title: "Edit Exam",
    },
  ];

  const onIsTimeLimitChange = () => {
    setIsTimeLimit(!isTimeLimit);
  };

  const addQuestion = (e, id) => {
    setExam({ ...exam, total_question: exam.total_question + 1 });
    setSelectedQue([...selectedQue, id]);
  };

  const removeQuestion = (e, id) => {
    setExam({ ...exam, total_question: exam.total_question - 1 });
    setSelectedQue(selectedQue.filter((el) => el !== id));
  };

  const onSubmitHandler = async () => {
    const questions = selectedQue.map((que, i) => {
      return { question: que, number: i + 1 };
    });
    let body = {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      passing_percent_mark: exam.passing_percent_mark,
      total_question: exam.total_question,
      is_time_limit: exam.is_time_limit,
      time_limit_hour: exam.is_time_limit ? exam.time_limit_hour : 0,
      time_limit_minute: exam.is_time_limit ? exam.time_limit_minute : 0,
      start_time: exam.start_time,
      end_time: exam.end_time,
      questions: questions,
      exam_language: exam.exam_language,
      is_date_limit: exam.is_date_limit,
      allow_redo_exam: exam.allow_redo_exam,
    };
    await onUpdateExam(body);
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
        { headers }
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const onUpdateExam = async (body) => {
    await onExamUpdateHandler(body);
  };

  const getExamDetail = useCallback(async () => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/examiner/get_single_exam_by_examiner/${examId}`,
        { headers }
      );
      if (response.status === 200) {
        const row = response.data.data;
        if (row.id !== exam.id) {
          setExam({
            ...exam,
            ...row,
            start_time: row.start_time?.toString().slice(0, 16),
            end_time: row.end_time?.toString().slice(0, 16),
          });

          setIsTimeLimit(row.is_time_limit);
          setSelectedQue(
            row.questions.map((que) => {
              return que.question;
            })
          );
        }
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId, navigate]);

  useEffect(() => {
    getExamDetail();
  }, [getExamDetail]);

  const [loading, setLoading] = useState(false);

  const validateFormHandler = async () => {
    setLoading(true);
    const curTitle = exam?.title?.trim();
    const curDescription = exam?.description?.trim();
    if (isTimeLimit) {
      let curTimeLimitHour = exam.time_limit_hour;
      let curTimeLimitMinute = exam.time_limit_minute;

      if (curTimeLimitHour === 0 && curTimeLimitMinute === 0) {
        toast.warning(
          "You have Selected Limited Time. Please Enter Time Limit Also."
        );
      } else {
        await onSubmitHandler();
      }
    } else if (curTitle === "" || curDescription === "") {
      toast.error("Please enter all details...");
    } else {
      setExam({ ...exam, time_limit_hour: 0, time_limit_minute: 0 });
      await onSubmitHandler();
    }
    setLoading(false);
  };

  return (
    <main id="main" className="main custom-main">
      <PageTitlesCreate
        title="Edit Assessments"
        breadcrumb={breadcrumb}
        showRightMenuBtn
      >
        <Button
          onClick={validateFormHandler}
          sx={{ ...ButtonCss, color: "#fff" }}
        >
          Save
        </Button>
      </PageTitlesCreate>
      <section className="section">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="CHALLENGES" {...a11yProps(0)} />
              <Tooltip title="coming soon" arrow>
                <Tab label="MULTIPLE CHOICE" /> {/*{...a11yProps(1)}*/}
              </Tooltip>
              <Tab label="SETTINGS" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <EditExamChallenges
              exam={exam}
              setExam={setExam}
              selectedQue={selectedQue}
              addQuestion={addQuestion}
              removeQuestion={removeQuestion}
              onSubmitHandler={onSubmitHandler}
              isTimeLimit={isTimeLimit}
              getExamDetail={getExamDetail}
              onIsTimeLimitChange={onIsTimeLimitChange}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ExamSetting
              exam={exam}
              setExam={setExam}
              onSubmitHandler={onSubmitHandler}
              isTimeLimit={isTimeLimit}
              getExamDetail={getExamDetail}
              onIsTimeLimitChange={onIsTimeLimitChange}
            />
          </CustomTabPanel>
        </Box>
      </section>
    </main>
  );
};

export default EditExam;
