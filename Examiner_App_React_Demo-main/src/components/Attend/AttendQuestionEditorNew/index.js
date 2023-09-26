import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadCookies } from "../../../utils/Cookies";
import axios from "axios";
import { toast } from "react-toastify";
import { getRemainTime } from "../../../store/remainTimeSlice";
import EditorHeader from "../AttendQuestionEditor/EditorHeader";
import LeftQuestionDiv from "../AttendQuestionEditor/Editor/LeftQuestionDiv";
import DefaultModel from "../../Modal/DefaultModel";
import {
  FULL_SCREEN_ALERT_MESS,
  INIT_CODE,
  LogoText,
  getCode,
} from "../../../utils/utils";
import CenterEditorDiv from "../AttendQuestionEditor/Editor/CenterEditorDiv";
import css from "./AttendQuestionEditor.module.css";
import RightOutputDiv from "../AttendQuestionEditor/Editor/RightOutputDiv";
import {
  COPY_DETECT,
  EMPTY_FULL_STATE,
  SWITCH_TAB,
  FULL_SCREEN_LEAVE,
  SWITCH_WINDOW,
} from "../../../store/answerSlice";
import Smartlook from "smartlook-client";

const AttendQuestionEditorNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const attendQuestionId = params.id;
  const cheatingData = useSelector((s) => s.answer);
  const {
    attendExamId,
    answer,
    switchedTab,
    switchedWindow,
    curLanguage,
    copyDetect,
    fullScreenLeave,
  } = cheatingData;
  console.table({
    answer,
    switchedTab,
    switchedWindow,
    curLanguage,
    copyDetect,
    fullScreenLeave,
  });

  const [code, setCode] = useState("");
  const [testcases, setTestcases] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [output, setOutput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOutputLoading, setIsOutputLoading] = useState(false);
  const [isFinalSubmitLoading, setIsFinalSubmitLoading] = useState(false);
  const [testcaseResults, setTestcaseResults] = useState([]);
  const [copyModal, setCopyModal] = useState(false);

  const [attendExam, setAttendExam] = useState({});
  const [copiedText, setCopiedText] = useState("");
  const [exam, setExam] = useState(null);
  const [data, setData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [language, setLanguage] = useState(curLanguage);
  const [loading, setLoding] = useState(true);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const { recorder, stream, remainTime } = useSelector(
    (state) => state.remainTime
  );
  const user = useSelector((state) => state.auth.user);
  ////////////////////////////////////////////////////////////////

  Smartlook.init("fcd973a1cf80555e022df8d67a61832f8361d1a2", undefined, () =>
    console.log("Smartlook is now initialized")
  );

  Smartlook.record({
    emails: true,
    forms: true,
    numbers: true,
    ips: true,
    api: true,
  });

  if (attendQuestionId && user?.id) {
    // Smartlook.identify(attendQuestionId, {
    //   name: user.name,
    //   email: user.email,
    //   questionId: attendQuestionId,
    //   userId: user.id,
    // });
  }
  useEffect(() => {
    Smartlook.restart();
  }, [attendQuestionId]);

  const projectKey = Smartlook.key;
  const url = Smartlook.playUrl;
  const recordId = Smartlook.recordId;
  const sessionId = Smartlook.sessionId;
  const visitorId = Smartlook.visitorId;
  const version = Smartlook.version;

  console.log({ projectKey, url, recordId, sessionId, visitorId, version });

  ////////////////////////////////////////////////////////////////

  const getAttendQuestionDetail = useCallback(
    async (reset = false) => {
      setLoding(true);
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
            curLanguage || response?.data?.data?.language || "JAVASCRIPT_NODE";
          setLanguage(language_res);
          setData(response?.data?.data);
          if (reset) {
            // reset logic
            const initCode = INIT_CODE[language_res];
            setCode(initCode);
          } else {
            setCode(getCode({ answer, attendQuestionId, language_res }));
          }
          setLoding(false);

          setTestcases(response?.data?.data?.question?.testcases);
          setExam(response?.data?.data?.attend_exam?.exam);
          // setIsTimeLimit(response?.data?.data?.attend_exam?.exam?.is_time_limit);
          if (
            attendExam?.exam?.id !== response?.data?.data?.attend_exam?.exam?.id
          ) {
            setAttendExam(response?.data?.data?.attend_exam);
          }

          if (response?.data?.data?.attend_exam?.exam?.is_time_limit === true) {
            await getRemainTime(
              dispatch,
              navigate,
              response?.data?.data?.attend_exam,
              response?.data?.data?.attend_exam?.exam,
              recorder,
              stream,
              cheatingData
            );
          }
        } else {
          toast.error("Server Error");
        }
      } catch (error) {
        setLoding(false);
        toast.error("Server Error");
        console.log({ error });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      attendQuestionId,
      dispatch,
      navigate,
      curLanguage,
      // cheatingData, // THINK
      recorder,
      stream,
    ]
  );

  const handleCopy = (event) => {
    if (typeof window !== "undefined") {
      const selectedText = window.getSelection().toString();
      setCopiedText(selectedText);
      console.log({ selectedText });
      setIsCopied(true);
    }
  };
  const handleKeyDown = (event) => {
    // Handle the "Ctrl+X" keyboard shortcut for cut
    if (event.ctrlKey && event.key === "x") {
      // Simulate the cut event manually
      handleCopy();
    }
  };

  const handlePaste = async (event) => {
    if (isCopied) {
      const clipboardData =
        event.clipboardData ||
        (typeof window !== "undefined" && window.Clipboard);
      const pastedText = clipboardData.getData("text");

      if (copiedText !== pastedText) {
        dispatch(COPY_DETECT());
        setCopyModal(true);
      }
    } else {
      dispatch(COPY_DETECT());
      setCopyModal(true);
    }
  };

  const closeCopyModal = () => setCopyModal(false);

  useEffect(() => {
    getAttendQuestionDetail();
  }, [getAttendQuestionDetail]);

  useEffect(() => {
    setIsFullScreen(!!document.fullscreenElement);
  }, []);

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE11 */
      element.msRequestFullscreen();
    }
  };

  const handleFullScreenChange = useCallback(() => {
    !!!document.fullscreenElement && dispatch(FULL_SCREEN_LEAVE());
    setIsFullScreen(!!document.fullscreenElement);
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [handleFullScreenChange, isFullScreen]);

  const updateAnswerCode = useCallback(
    async ({ updatedCode, language }) => {
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
          // setCode(response?.data?.data?.answer);
        } else {
          toast.error("Server Error");
        }
      } catch (error) {
        toast.error("Server Error");
        console.log({ error });
      }
    },
    [attendExam?.exam?.id, attendQuestionId]
  );

  const runCodeHandler = async (e, inputVal) => {
    setIsOutputLoading(true);
    try {
      await updateAnswerCode({ updatedCode: code, language: language });
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/attendee/run_code_view/`,
        {
          answer: getCode({
            answer,
            attendQuestionId,
            language_res: language,
          }),
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
      await updateAnswerCode({ updatedCode: code, language: language });
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/attendee/run_testcase_view/`,
        {
          answer: getCode({
            answer,
            attendQuestionId,
            language_res: language,
          }),
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

  const submitCodeHandler = useCallback(async () => {
    setIsFinalSubmitLoading(true);
    try {
      await updateAnswerCode({ updatedCode: code, language: language });
      let access_token = loadCookies("access_token");
      if (!access_token) {
        toast.error("No Active User");
        window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExam?.exam?.id}`;
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/attendee/end_attend_question/${attendQuestionId}/`,
        {
          answer: getCode({
            answer,
            attendQuestionId,
            language_res: language,
          }),
          testcases: testcases,
          language: language,
          filename: attendQuestionId,
        },
        { headers }
      );

      if (response.status === 200) {
        attendExamId
          ? // navigate(`attend/  /${attendExamId}`, {
            //     replace: true,
            //   })
            navigate(-1)
          : navigate(-1);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
    setIsFinalSubmitLoading(false);
  }, [
    answer,
    attendExam?.exam?.id,
    attendExamId,
    attendQuestionId,
    code,
    language,
    navigate,
    testcases,
    updateAnswerCode,
  ]);

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
          cheatingData,
          submitCodeHandler
        );
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [
    dispatch,
    navigate,
    attendExam,
    exam,
    recorder,
    remainTime,
    stream,
    cheatingData,
    submitCodeHandler,
  ]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      dispatch(SWITCH_TAB());
    } else {
      console.log("User returned to the page");
    }
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    const handleWindowBlur = () => {
      dispatch(SWITCH_WINDOW());
    };

    window.addEventListener("blur", handleWindowBlur);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [dispatch]);

  return (
    <>
      <DefaultModel
        open={!isFullScreen}
        handleClose={() => console.log("first")}
        onClick={() => {
          enterFullScreen();
        }}
        Title={<LogoText />}
        message={FULL_SCREEN_ALERT_MESS}
        closeBtn="Leave"
        arrgeBtn="Stya"
      />

      <DefaultModel
        open={copyModal}
        handleClose={closeCopyModal}
        onClick={closeCopyModal}
        Title={<LogoText />}
        message={"Copy Paste Detected from outside"}
        arrgeBtn="Okay"
      />
      <EditorHeader redirect={attendExamId} />
      <div
        className={css.main}
        onCopy={handleCopy}
        // onCut={handleCopy}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        id="TEXT_EDITOR"
      >
        <div className={css.sideDiv}>
          <LeftQuestionDiv remainTime={remainTime} data={data} exam={exam} />
        </div>
        <div className={css.codeDiv}>
          <CenterEditorDiv
            attendQuestionId={attendQuestionId}
            code={code == null ? " " : code}
            language={language}
            loading={loading}
            getAttendQuestionDetail={getAttendQuestionDetail}
          />
        </div>
        <div className={css.sideDiv}>
          <RightOutputDiv
            isFinalSubmitLoading={isFinalSubmitLoading}
            submitCodeHandler={submitCodeHandler}
            runTestcaseHandler={runTestcaseHandler}
            runCodeHandler={runCodeHandler}
            testcaseResults={testcaseResults}
            testcases={testcases}
            passedTestcases={0}
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

export default AttendQuestionEditorNew;
