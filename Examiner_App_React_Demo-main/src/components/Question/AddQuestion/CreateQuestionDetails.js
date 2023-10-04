import React, { useState } from "react";
import css from "./AddQuestion.module.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { all_language_arr, modules } from "../../../utils/utils";

const LanguageValues = all_language_arr.map((val) => val.key);

const CreateQuestionDetails = (props) => {
  const { onSubmit, question, setQue } = props;

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

  const descriptionChange = (event) => {
    setQue({ ...question, description: event });
  };

  const onChangeHanlder = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (e.target.name === "is_private") {
      inputValue = e.target.checked;
    }
    setQue({ ...question, [inputName]: inputValue });
  };

  return (
    <Box className={css.gridBox}>
      <Box className={css.topHeading}>
        <Typography className={css.topHeadingText}>Question Details</Typography>
      </Box>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Title</Typography>
        <TextField
          type=""
          fullWidth
          variant="standard"
          name="title"
          id="title"
          value={question.title}
          onChange={onChangeHanlder}
        />
      </Box>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Description</Typography>
        <ReactQuill
          theme="snow"
          style={{ marginTop: "10px" }}
          modules={modules}
          placeholder="write your content here ...."
          //   defaultValue={"Team Lanet Question"}
          value={question.description}
          onChange={descriptionChange}
        />
      </Box>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Level</Typography>
        <Box>
          <Button color="secondary">Easy</Button>
          <Button color="warning">Medium</Button>
          <Button color="error">Hard</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateQuestionDetails;
