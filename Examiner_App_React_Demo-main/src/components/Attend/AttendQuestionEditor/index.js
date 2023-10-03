import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

// import { sublime } from "@uiw/codemirror-theme-sublime";
import { darcula } from "@uiw/codemirror-theme-darcula";
// import { python } from "@codemirror/lang-python";
// import { javascript } from "@codemirror/lang-javascript";

import {
  getRemainTime,
  increasePasteCount,
} from "../../../store/remainTimeSlice";
import { loadCookies } from "../../../utils/Cookies";
import EditorHeader from "./EditorHeader";
import LeftQuestionDiv from "./Editor/LeftQuestionDiv";
import RightOutputDiv from "./Editor/RightOutputDiv";
import CenterEditorDiv from "./Editor/CenterEditorDiv";

const AttendQuestionEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const attendQuestionId = params.id;
  const [isLoading, setIsLoding] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [data, setData] = useState();
  const [attendExam, setAttendExam] = useState({});
  const [exam, setExam] = useState();
  const [attendQuestions, setAttendQuestions] = useState([]);
  const [isTimeLimit, setIsTimeLimit] = useState(false);

  const [language, setLanguage] = useState("PYTHON3");
  const [theme, setTheme] = useState(darcula);
  const [code, setCode] = useState("");
  const [testcases, setTestcases] = useState([]);

  const [isCopied, setIsCopied] = useState(false);
  const [pasteCodeCount, setPasteCodeCount] = useState(0);

  const [passedTestcases, setPassedTestcases] = useState(0);
  const [testcaseResults, setTestcaseResults] = useState([]);

  const [output, setOutput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [testcaseResult, setTestcaseResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOutputLoading, setIsOutputLoading] = useState(false);
  const [isFinalSubmitLoading, setIsFinalSubmitLoading] = useState(false);

  const recorder = useSelector((state) => state.remainTime.recorder);
  const stream = useSelector((state) => state.remainTime.stream);
  const pasteCount = useSelector((state) => state.remainTime.pasteCount);
  const remainTime = useSelector((state) => state.remainTime.remainTime);

  const getAttendQuestionDetail = async (reset = false, lang = language) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/attendee/get_single_attend_question/${attendQuestionId}`,
        { headers }
      );
      if (response.status === 200) {
        const language_res =
          response?.data?.data?.language || "JAVASCRIPT_NODE";
        if (reset) {
          setData({
            ...data,
            python_code: response?.data?.data?.question?.python_init_code,
            javascript_code:
              response?.data?.data?.question?.javascript_init_code,
          });

          if (language_res === "PYTHON3") {
            setCode(
              `name = input()                  # Reading input from STDIN\nprint('Hi, %s.' % name)         # Writing output to STDOUT`
            );
          } else if (language_res === "JAVASCRIPT_NODE") {
            setCode(`const def(arg){\n\treturn arg;\n} def(input);`);
          } else if (language_res === "PHP") {
            setCode(
              `<?php\n/*\n\n// Sample code to perform I/O:\n\n\nfscanf(STDIN, "%s\n", $name);           // Reading input from STDIN\necho "Hi, ".$name.".\n";                // Writing output to STDOUT\n\n// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail\n*/\n\n// Write your code here\n?>`
            );
          }
        } else {
          setData(response?.data?.data);
          if (response?.data?.data?.answer) {
            setCode(response?.data?.data?.answer);
          }
          // if (language_res === "PYTHON3") {
          //   setCode(response?.data?.data?.python_code);
          // } else if (language_res === "JAVASCRIPT_NODE") {
          //   setCode(response?.data?.data?.javascript_code);
          // }
        }
        setIsReset(false);

        setTestcases(response?.data?.data?.question?.testcases);
        setExam(response?.data?.data?.attend_exam?.exam);
        setIsTimeLimit(response?.data?.data?.attend_exam?.exam?.is_time_limit);
        setAttendExam(response?.data?.data?.attend_exam);

        if (response?.data?.data?.attend_exam?.exam?.is_time_limit === true) {
          await getRemainTime(
            dispatch,
            navigate,
            response?.data?.data?.attend_exam,
            response?.data?.data?.attend_exam?.exam,
            recorder,
            stream,
            pasteCount
          );
        }
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const runCodeHandler = async (e, inputVal) => {
    setIsOutputLoading(true);
    try {
      await updateAnswerCode(code);
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/attendee/run_code_view/`,
        {
          answer: code,
          testcases: testcases,
          language: language,
          filename: attendQuestionId,
          inputVal: inputVal,
        },
        { headers }
      );

      let data = response.data;

      let tempOutput = data.data.output;
      setOutput(tempOutput);

      let tempErrorMsg = data.data.errorMsg;
      if (tempErrorMsg != null) {
        setIsError(true);
        setErrorMsg(tempErrorMsg);
        setIsCorrect(false);
      } else {
        setIsError(false);
      }
    } catch (err) {}
    setIsOutputLoading(false);
  };

  const runTestcaseHandler = async () => {
    try {
      setIsOutputLoading(true);
      setTestcaseResults([]);
      await updateAnswerCode(code);
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/attendee/run_testcase_view/`,
        {
          answer: code,
          testcases: testcases,
          language: language,
          filename: attendQuestionId,
        },
        { headers }
      );
      const tempResult = response?.data?.data;
      setTestcaseResults([
        {
          input: tempResult.inputs[0],
          output: tempResult.outputs[0],
          testcaseResult: tempResult.testcaseResults[0],
          errorMsg: tempResult.errorMsgs[0],
        },
        {
          input: tempResult.inputs[1],
          output: tempResult.outputs[1],
          testcaseResult: tempResult.testcaseResults[1],
          errorMsg: tempResult.errorMsgs[1],
        },
      ]);
      setOutput("");
      setErrorMsg("");
    } catch (err) {}
    setIsOutputLoading(false);
  };

  const submitCodeHandler = async () => {
    setIsFinalSubmitLoading(true);
    try {
      await updateAnswerCode(code);
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/attendee/end_attend_question/${attendQuestionId}/`,
        {
          answer: code,
          testcases: testcases,
          language: language,
          filename: attendQuestionId,
        },
        { headers }
      );

      if (response.status === 200) {
        navigate(-1);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
    setIsFinalSubmitLoading(false);
  };

  const updateAnswerCode = async (updatedCode) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const body = { language: language, answer: updatedCode };
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/attendee/update_attend_question/${attendQuestionId}/`,
        body,
        { headers }
      );

      if (response.status === 200) {
        setCode(response?.data?.data?.answer);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const handleLanguageChange = (event) => {
    getAttendQuestionDetail(false, event.target.value);
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const onCopyFun = (e) => {
    setIsCopied(true);
  };

  const onPasteFun = async (e) => {
    if (isCopied) {
    } else {
      alert("Copy Paste Detected from outside");
      setPasteCodeCount((pre) => pre + 1);
      await increasePasteCount(dispatch, pasteCount);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (exam?.is_time_limit) {
        getRemainTime(
          dispatch,
          navigate,
          attendExam,
          exam,
          recorder,
          stream,
          pasteCount
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [remainTime]);

  useEffect(() => {
    setIsLoding(true);
    getAttendQuestionDetail();
    setIsLoding(false);
  }, []);

  return (
    <>
      <EditorHeader />
      <div className="row m-0 p-0" onCopy={onCopyFun} onPaste={onPasteFun}>
        <div className="col-md-3">
          <LeftQuestionDiv remainTime={remainTime} data={data} exam={exam} />
        </div>
        <div className="col-md-6">
          <CenterEditorDiv
            handleLanguageChange={handleLanguageChange}
            theme={theme}
            handleThemeChange={handleThemeChange}
            onPasteFun={onPasteFun}
            code={code == null ? " " : code}
            language={language}
            updateAnswerCode={updateAnswerCode}
            getAttendQuestionDetail={getAttendQuestionDetail}
          />
        </div>
        <div className="col-md-3 m-0">
          <RightOutputDiv
            isFinalSubmitLoading={isFinalSubmitLoading}
            submitCodeHandler={submitCodeHandler}
            runTestcaseHandler={runTestcaseHandler}
            runCodeHandler={runCodeHandler}
            testcases={testcases}
            testcaseResults={testcaseResults}
            passedTestcases={passedTestcases}
            errorMsg={errorMsg}
            output={output}
            isCorrect={isCorrect}
            isError={isError}
            isOutputLoading={isOutputLoading}
          />
        </div>
      </div>
    </>
  );
};

export default AttendQuestionEditor;
