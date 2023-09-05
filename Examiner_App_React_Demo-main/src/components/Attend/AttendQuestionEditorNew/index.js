import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadCookies } from "../../../utils/Cookies";
import axios from "axios";
import { toast } from "react-toastify";
import {
  getRemainTime,
  increasePasteCount,
} from "../../../store/remainTimeSlice";
import EditorHeader from "../AttendQuestionEditor/EditorHeader";
import LeftQuestionDiv from "../AttendQuestionEditor/Editor/LeftQuestionDiv";
import DefalutModel from "../../Modal/DefalutModel";
import {
  FULL_SCREEN_ALERT_MESS,
  INIT_CODE,
  LogoText,
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

const AttendQuestionEditorNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const attendQuestionId = params.id;
  const {
    attendExamId,
    answer,
    switchedTab,
    switchedWindow,
    curLanguage,
    copyDetect,
    fullScreenLeave,
  } = useSelector((s) => s.answer);

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

  const { recorder, stream, pasteCount, remainTime } = useSelector(
    (state) => state.remainTime
  );

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
            const initCode = answer[attendQuestionId][language_res]
              ? answer[attendQuestionId][language_res]
              : INIT_CODE[language_res];
            setCode(initCode);
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
              pasteCount
            );
          }
        } else {
          toast.error("Server Error");
        }
      } catch (error) {
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
      pasteCount,
      recorder,
      stream,
    ]
  );

  const handleCopy = (event) => {
    if (typeof window !== "undefined") {
      const selectedText = window.getSelection().toString();
      setCopiedText(selectedText);
      setIsCopied(true);
    }
  };

  const handlePaste = async (event) => {
    console.log("first");
    if (isCopied) {
      const clipboardData =
        event.clipboardData ||
        (typeof window !== "undefined" && window.Clipboard);
      const pastedText = clipboardData.getData("text");

      if (copiedText !== pastedText) {
        dispatch(COPY_DETECT());
        setCopyModal(true);
        await increasePasteCount(dispatch, pasteCount);
      }
    } else {
      dispatch(COPY_DETECT());
      setCopyModal(true);
      await increasePasteCount(dispatch, pasteCount);
    }
  };

  const closeCopyModal = () => setCopyModal(false);

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
  }, [
    dispatch,
    navigate,
    attendExam,
    exam,
    recorder,
    remainTime,
    stream,
    pasteCount,
  ]);

  useEffect(() => {
    getAttendQuestionDetail();
  }, [getAttendQuestionDetail]);

  useEffect(() => {
    setIsFullScreen(!!document.fullscreenElement);
    // dispatch(EMPTY_FULL_STATE());
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

  const updateAnswerCode = async ({ updatedCode, language }) => {
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
      await updateAnswerCode({ updatedCode: code, language: curLanguage });
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
        attendExamId
          ? navigate(
              `${process.env.REACT_APP_BASE_URL}/attend/attend_exam_detail/${attendExamId}`
            )
          : navigate(-1);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
    setIsFinalSubmitLoading(false);
  };

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
      <DefalutModel
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

      <DefalutModel
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
        onCut={handleCopy}
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
