import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import css from "./CenterEditorDiv.module.css";
import {
  cSvg,
  cppSvg,
  javaSvg,
  javascriptSvg,
  phpSvg,
  pythonSvg,
  rubyonrailsSvg,
  typescriptSvg,
} from "../../../../utils/svgPack";

const LanguageSelect = ({ tempLanguage, onChangeLanguage }) => {
  return (
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
        <MenuItem value={"RUBY"}>
          <div className={css.selectOptions}>
            <span>{rubyonrailsSvg(css.selectIcon)}</span>
            <h4>ruby</h4>
          </div>
        </MenuItem>
        <MenuItem value={"C"}>
          <div className={css.selectOptions}>
            <span>{cSvg(css.selectIcon)}</span>
            <h4>C</h4>
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
