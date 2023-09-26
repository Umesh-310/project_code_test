import { useState } from "react";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";
import { all_language_arr, languagesSvg } from "../../../utils/utils";

import LanguageSelect from "../../../utils/LanguageSelect";

const LanguageValues = all_language_arr.map((val) => val.key);

const Page1Question = ({ onSubmit, que, setQue }) => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(LanguageValues);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value.includes("select-all")) {
      setLanguage(LanguageValues);
    } else if (value.includes("deselect-all")) {
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
    setQue({ ...que, question_language: language });
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
    return (
      <Chip
        icon={languagesSvg[value.key]}
        key={value.key}
        label={value.value}
      />
    );
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
              <LanguageSelect handleChange={handleChange} language={language} />
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
