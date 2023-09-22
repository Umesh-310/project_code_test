import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { all_language_arr } from "../../../utils/utils";
import {
  cSvg,
  cppSvg,
  javaSvg,
  javascriptSvg,
  phpSvg,
  pythonSvg,
  rubyonrailsSvg,
  typescriptSvg,
} from "../../../utils/svgPack";
import css from "../../Question/MyQuestion/MyQuestion.module.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 1,
    },
  },
};

function getStyles(lang, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(lang) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const LanguageValues = all_language_arr.map((val) => val.key);

const svgs = {
  JAVASCRIPT_NODE: javascriptSvg(css.chipIcon),
  PYTHON3: pythonSvg(css.chipIcon),
  PHP: phpSvg(css.chipIcon),
  JAVA14: javaSvg(css.chipIcon),
  TYPESCRIPT: typescriptSvg(css.chipIcon),
  CPP17: cppSvg(css.chipIcon),
  RUBY: rubyonrailsSvg(css.chipIcon),
  C: cSvg(css.chipIcon),
};

const Page1Question = ({ onSubmit, que, setQue }) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const [language, setLanguage] = useState(LanguageValues);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log({ value });
    if (value.includes("select-all")) {
      setLanguage(LanguageValues);
    } else if (value.includes("deseclect-all")) {
      setLanguage([]);
    } else {
      setLanguage(typeof value === "string" ? value.split(",") : value);
    }
  };

  const onChangeHanlder = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (e.target.name === "is_private") {
      inputValue = e.target.checked;
    }
    setQue({ ...que, [inputName]: inputValue });
  };

  const validateFormHandler = () => {
    const curTitle = que?.title?.trim();
    const curDescription = que?.description?.trim();
    const curLevel = que?.level?.trim();

    if (
      curTitle === "" ||
      curDescription === "" ||
      curLevel === "" ||
      language.length === 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQue({ ...que, exam_language: language });
    setLoading(true);
    const validate = validateFormHandler();
    if (!validate) {
      toast.error("Please enter all details...");
    } else {
      await onSubmit();
    }
    setLoading(false);
  };

  const ChipLogo = (value) => {
    return <Chip icon={svgs[value.key]} key={value.key} label={value.value} />;
  };

  return (
    <>
      <div className="">
        <h3 className="custom-modal-title mb-3">Question Details</h3>
      </div>
      <div>
        <form className="" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label
              htmlFor="title"
              className="col-md-4 col-lg-3 col-form-label custom-form-label-secondary"
            >
              Title
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="title"
                type="text"
                className="form-control"
                id="title"
                value={que.title}
                onChange={onChangeHanlder}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="description"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Description
            </label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="description"
                className="form-control"
                id="description"
                style={{ maxHeight: "150px" }}
                value={que.description}
                onChange={onChangeHanlder}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="level"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Level
            </label>
            <div className="col-md-8 col-lg-9">
              <select
                name="level"
                className="form-select"
                id="level"
                value={que.level}
                onChange={onChangeHanlder}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="example"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Example
            </label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="example"
                className="form-control"
                id="example"
                style={{ maxHeight: "150px" }}
                value={que.example}
                onChange={onChangeHanlder}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="language"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Exam Language
            </label>
            <div className="col-md-8 col-lg-9">
              <FormControl sx={{ width: 1 }}>
                <Select
                  id="demo-multiple-chip"
                  multiple
                  value={language}
                  name="exam_language"
                  placeholder="language"
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {all_language_arr.map((value) => {
                        if (selected.includes(value.key))
                          return ChipLogo(value);
                        else {
                          return <></>;
                        }
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  <MenuItem
                    value={"select-all"}
                    style={getStyles("select-all", language, theme)}
                  >
                    {"Select All"}
                  </MenuItem>
                  <MenuItem
                    value={"deseclect-all"}
                    style={getStyles("deseclect-all", language, theme)}
                  >
                    {"Deseclect All"}
                  </MenuItem>
                  {all_language_arr.map((lang) => (
                    <MenuItem
                      key={lang}
                      value={lang.key}
                      style={getStyles(lang, language, theme)}
                    >
                      <div className={css.menuItemSvg}>{svgs[lang.key]}</div>
                      {lang.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="row mb-3">
            <label
              htmlFor="isprivate"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Is Private
            </label>
            <div className="col-md-8 col-lg-9  form-switch">
              <input
                name="is_private"
                className="form-check-input"
                type="checkbox"
                id="isprivate"
                onChange={onChangeHanlder}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {loading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary next">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Page1Question;
