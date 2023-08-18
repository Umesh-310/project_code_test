import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import CodeMirror from "@uiw/react-codemirror";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";

const extensions = {
  PYTHON3: [python()],
  JAVASCRIPT_NODE: [javascript({ jsx: true })],
};

const CenterEditorDiv = ({
  handleLanguageChange,
  theme,
  handleThemeChange,
  onPasteFun,
  code,
  language,
  updateAnswerCode,
  getAttendQuestionDetail,
}) => {
  const [initialCode, setInitialCode] = useState();
  const [tempCode, setTempCode] = useState("");
  const onChange = async () => {
    await updateAnswerCode(tempCode);
  };

  const onReset = async (e) => {
    if (
      window.confirm(
        "Are you sure you want to reset back to the default code template? If you click OK you will lose your current code.",
      )
    ) {
      setInitialCode();
      await getAttendQuestionDetail(true);
    }
  };

  // let updateTimeout;

  // const updateCode = e => {
  // clearTimeout(updateTimeout)
  // if (e == code) return;

  // updateTimeout = setTimeout(async() => {
  // await updateAnswerCode(e)
  // }, 500)
  // }

  // useEffect(() => {
  // const interval = setInterval(async () => {
  // await onChange();
  // }, 5000); // 5000 milliseconds = 5 seconds

  // return () => {
  // clearInterval(interval);
  // };
  // });

  // useEffect(()=>{
  // setTempCode(code)
  // },[code])

  const updateCode = (e) => {
    console.log("inside updateCoide", e);
    setTempCode(e);
  };

  useEffect(() => {
    console.log("inside useEffect", tempCode);
    if (tempCode?.length > 0) {
      const timer = setTimeout(() => {
        updateAnswerCode(tempCode);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [tempCode]);

  // useEffect(()=>{
  // console.log(code,"-----inside code useEffect----", tempCode);
  // code && setTempCode(code)
  // },[code])

  // useEffect(()=>{
  // setTempCode(initialCode)
  // },[initialCode])

  useEffect(() => {
    if (!initialCode && code !== initialCode) {
      setInitialCode(code);
      setTempCode(code);
    }
  }, [code]);

  return (
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
        <div>
          <FormControl
            sx={{ m: 1, minWidth: 120, backgroundColor: "lightgray" }}
            variant="filled"
            color="success"
          >
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label="Laguage"
              onChange={(e) => {
                setInitialCode();
                handleLanguageChange(e);
              }}
            >
              <MenuItem value={"PYTHON3"}>Python 3</MenuItem>
              <MenuItem value={"JAVASCRIPT_NODE"}>JavaScript(Nodejs)</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1, minWidth: 120, backgroundColor: "lightgray" }}
            variant="filled"
            color="success"
          >
            <InputLabel id="demo-simple-select-label">Theme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={theme}
              label="Theme"
              onChange={handleThemeChange}
            >
              <MenuItem value={darcula}>darcula</MenuItem>
              <MenuItem value={sublime}>sublime</MenuItem>
            </Select>
          </FormControl>
        </div>
        <button
          className="btn btn-secondary m-3"
          style={{ width: "auto", fontSize: "16px" }}
          onClick={(e) => onReset()}
        >
          <RotateLeftIcon />
          Reset
        </button>
      </div>
      <div id="code-mirror-id">
        <CodeMirror
          className="w-96 h-90"
          value={tempCode}
          height="90vh"
          theme={theme}
          name="codeMirror"
          extensions={extensions[language]}
          onChange={updateCode}
          type="textarea"
        />
      </div>
    </div>
  );
};

export default CenterEditorDiv;
