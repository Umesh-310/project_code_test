import React, { useEffect, useState } from "react";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import loading_img from "../../../../assets/images/loading.jpg";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_MY_CODE, SET_LANGUAGE } from "../../../../store/answerSlice";
import css from "./CenterEditorDiv.module.css";
import DefaultModel from "../../../Modal/DefaultModel";
import { LogoText, RESET_TEXT } from "../../../../utils/utils";
import LanguageSelect from "./LanguageSelect";

// //////////////////////////////////////////////////
// https://github.com/securingsincity/react-ace/blob/master/docs/Ace.md npm i react-ace

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-c_cpp";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";

const extensions = {
  PYTHON3: "python",
  JAVASCRIPT_NODE: "javascript",
  PHP: "php",
  JAVA14: "java",
  TYPESCRIPT: "typescript",
  CPP17: "c_cpp",
  RUBY: "ruby",
  C: "c_cpp",
};

const CenterEditorDiv = ({
  code,
  language,
  attendQuestionId,
  loading,
  getAttendQuestionDetail,
}) => {
  const [initialCode, setInitialCode] = useState(null);
  const [tempLanguage, setTempLanguage] = useState(language || "JAVA14");
  const [tempCode, setTempCode] = useState(code || "");
  const [theme, setTheme] = useState("monokai");
  const [reset, setReset] = useState(false);
  const { answer } = useSelector((S) => S.answer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (language) {
      setTempLanguage(language);
    }
  }, [language]);

  const onReset = async (e) => {
    setInitialCode(null);
    dispatch(
      SAVE_MY_CODE({
        [attendQuestionId]: {},
      })
    );
    await getAttendQuestionDetail(true);
    setReset(false);
  };
  const onChangeLanguage = ({ target }) => {
    const { value } = target;
    setTempLanguage(value);
    dispatch(SET_LANGUAGE(value));
    getAttendQuestionDetail(false);
  };

  const updateCode = (e) => {
    if (e !== tempCode) {
      console.log("inside updateCoide", e);
      dispatch(
        SAVE_MY_CODE({
          [attendQuestionId]: {
            ...answer[attendQuestionId],
            [tempLanguage]: e,
          },
        })
      );
      setTempCode(e);
    }
  };

  useEffect(() => {
    if (code !== initialCode) {
      setInitialCode(code);
      setTempCode(code);
    }
  }, [code, initialCode]);

  return loading ? (
    <div className={"loadingDiv"}>
      <img src={loading_img} style={{ width: "100px" }} alt={loading_img} />
    </div>
  ) : (
    <>
      <DefaultModel
        open={reset}
        handleClose={() => setReset(false)}
        onClick={() => onReset()}
        Title={<LogoText />}
        message={RESET_TEXT}
        closeBtn="Cancel"
        arrgeBtn="Reset"
      />
      <div
        className="m-0"
        style={{ borderRight: "5px solid gray", borderLeft: "5px solid gray" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#2B2B2B",
          }}
        >
          <LanguageSelect
            tempLanguage={tempLanguage}
            onChangeLanguage={onChangeLanguage}
          />
          <div className={css.leftBttonGroup}>
            {theme === "monokai" ? (
              <button
                className="btn btn-secondary m-3"
                style={{ width: "auto", fontSize: "16px" }}
                onClick={() => setTheme("tomorrow")}
              >
                <NightlightRoundIcon />
                dark
              </button>
            ) : (
              <button
                className="btn btn-secondary m-3"
                style={{
                  width: "auto",
                  fontSize: "16px",
                  color: "black",
                  backgroundColor: "#fff",
                }}
                onClick={() => setTheme("monokai")}
              >
                <LightModeIcon />
                Light
              </button>
            )}
            <button
              className="btn btn-secondary m-3"
              style={{ width: "auto", fontSize: "16px" }}
              onClick={() => setReset(true)}
            >
              <RotateLeftIcon />
              Reset
            </button>
          </div>
        </div>
        <div id="code-mirror-id">
          <AceEditor
            placeholder="CoderTest"
            mode={extensions[tempLanguage]}
            theme={theme}
            name="blah2"
            onLoad={() => console.log("loading...")}
            onChange={updateCode}
            fontSize={16}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={tempCode}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              useWorker: false,
              tabSize: 3,
            }}
            height="83vh"
            width="665px"
          />
        </div>
      </div>
    </>
  );
};

export default CenterEditorDiv;
