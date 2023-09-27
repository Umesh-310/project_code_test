import { Box, Typography } from "@mui/material";
import React from "react";
import css from "../EditExam.module.css";
import SelectYesNo from "../../../../utils/SelectYesNo/SelectYesNo";

const CandidateExperience = (props) => {
  const { exam, setExam } = props;

  const onChangeHanlder = async (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (inputName === "allow_redo_exam") {
      inputValue = e.target.value === "Yes" ? true : false;
    }
    if (e.target.name === "total_question") {
      inputValue = parseInt(e.target.value);
    }

    setExam({ ...exam, [inputName]: inputValue });
  };
  return (
    <Box className={css.gridBox}>
      <Box className={css.topHeading}>
        <Typography className={css.topHeadingText}>
          Candidate experience
        </Typography>
      </Box>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Exams</Typography>
        <Typography variant="h6" className={css.smallHeadingText}>
          Allow candidates to redo coding challenges.
        </Typography>
        <SelectYesNo
          id="allow_redo_exam"
          name="allow_redo_exam"
          value={exam?.allow_redo_exam ? "Yes" : "No"}
          onChange={onChangeHanlder}
        />
      </Box>

      {/* <Divider component="p" sx={{ margin: "4px 0px" }} /> */}
    </Box>
  );
};

export default CandidateExperience;
