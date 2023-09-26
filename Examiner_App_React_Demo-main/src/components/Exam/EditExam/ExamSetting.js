import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import css from "./EditExam.module.css";
import SettingPageOne from "./EditExamComponents/SettingPageOne";
import { ButtonCss } from "../../../utils/utils";
import { toast } from "react-toastify";
import CandidateExperience from "./EditExamComponents/CandidateExperience";

const ExamSetting = (props) => {
  const {
    exam,
    setExam,
    selectedQue,
    addQuestion,
    removeQuestion,
    onSubmitHandler,
    isTimeLimit,
    onIsTimeLimitChange,
  } = props;

  const [loading, setLoading] = useState(false);

  const validateFormHandler = () => {
    if (isTimeLimit) {
      let curTimeLimitHour = exam.time_limit_hour;
      let curTimeLimitMinute = exam.time_limit_minute;
      const curTitle = exam?.title?.trim();
      const curDescription = exam?.description?.trim();
      if (curTimeLimitHour === 0 && curTimeLimitMinute === 0) {
        toast.warning(
          "You have Selected Limited Time. Please Enter Time Limit Also."
        );
        return false;
      } else if (curTitle === "" || curDescription === "") {
        return false;
      } else {
        return true;
      }
    } else {
      setExam({ ...exam, time_limit_hour: 0, time_limit_minute: 0 });
      return true;
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    const validate = validateFormHandler();
    if (!validate) {
      toast.error("Please enter all details...");
    } else {
      await onSubmitHandler();
    }
    setLoading(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <SettingPageOne
            // onSubmitHandler={onSubmitHandler}
            exam={exam}
            setExam={setExam}
            isTimeLimit={isTimeLimit}
            onIsTimeLimitChange={onIsTimeLimitChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CandidateExperience />
        </Grid>
      </Grid>
      <Box className={css.bottomPart}>
        <Button onClick={handleSubmit} sx={{ ...ButtonCss, color: "#fff" }}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ExamSetting;
