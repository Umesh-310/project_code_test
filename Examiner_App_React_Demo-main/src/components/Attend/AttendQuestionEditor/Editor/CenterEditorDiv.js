import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import loading_img from "../../../../assets/images/loading.jpg";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_MY_CODE, SET_LANGUAGE } from "../../../../store/answerSlice";
import css from "./CenterEditorDiv.module.css";
import {
  pythonSvg,
  javaSvg,
  javascriptSvg,
  rubyonrailsSvg,
  phpSvg,
  asp_netSvg,
  cppSvg,
  typescriptSvg,
} from "../../../../utils/svgPack";
import DefalutModel from "../../../Modal/DefalutModel";
import { LogoText, REST_TEXT } from "../../../../utils/utils";

const extensions = {
  PYTHON3: [python()],
  JAVASCRIPT_NODE: [javascript({ jsx: true })],
  PHP: [php()],
  JAVA14: [java()],
  // RUBY : [ruby()]
  // C : [c()]
  CPP17: [cpp()],
  TYPESCRIPT: [javascript({ typescript: true, jsx: true })],
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
  const [theme, setTheme] = useState("dark");
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
      <DefalutModel
        open={reset}
        handleClose={() => setReset(false)}
        onClick={() => onReset()}
        Title={<LogoText />}
        message={REST_TEXT}
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
          <>
            <FormControl
              sx={{ m: 1, minWidth: 120, backgroundColor: "#fff" }}
              variant="filled"
              color="success"
            >
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tempLanguage}
                label="Laguage"
                onChange={onChangeLanguage}
              >
                <MenuItem value={"PYTHON3"}>
                  <div className={css.selectOptions}>
                    <span>{pythonSvg(css.selectIcon)}</span>
                    <h4>Python</h4>
                  </div>
                </MenuItem>
                <MenuItem value={"JAVASCRIPT_NODE"}>
                  <div className={css.selectOptions}>
                    <span>{javascriptSvg(css.selectIcon)}</span>
                    <h4>JavaScript(Nodejs)</h4>
                  </div>
                </MenuItem>
                <MenuItem value={"PHP"}>
                  <div className={css.selectOptions}>
                    <span>{phpSvg(css.selectIcon)}</span>
                    <h4>Php</h4>
                  </div>
                </MenuItem>
                <MenuItem value={"JAVA14"}>
                  <div className={css.selectOptions}>
                    <span>{javaSvg(css.selectIcon)}</span>
                    <h4>Java 14</h4>
                  </div>
                </MenuItem>
                <MenuItem value={"TYPESCRIPT"}>
                  <div className={css.selectOptions}>
                    <span>{typescriptSvg(css.selectIcon)}</span>
                    <h4>typescript</h4>
                  </div>
                </MenuItem>
                <MenuItem value={"CPP17"}>
                  <div className={css.selectOptions}>
                    <span>{cppSvg(css.selectIcon)}</span>
                    <h4>Cpp</h4>
                  </div>
                </MenuItem>
              </Select>
            </FormControl>
          </>
          <div className={css.leftBttonGroup}>
            {theme === "dark" ? (
              <button
                className="btn btn-secondary m-3"
                style={{ width: "auto", fontSize: "16px" }}
                onClick={() => setTheme("light")}
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
                onClick={() => setTheme("dark")}
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
          <CodeMirror
            className="w-96 h-90"
            value={tempCode}
            height="90vh"
            theme={theme}
            name="codeMirror"
            extensions={extensions[tempLanguage]}
            onChange={updateCode}
            type="textarea"
          />
        </div>
      </div>
    </>
  );
};

export default CenterEditorDiv;
