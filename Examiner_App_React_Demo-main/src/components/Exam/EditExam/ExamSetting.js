import { Box, Grid } from "@mui/material";
import React from "react";
import SettingPageOne from "./EditExamComponents/SettingPageOne";
import CandidateExperience from "./EditExamComponents/CandidateExperience";

const ExamSetting = (props) => {
  const { exam, setExam, isTimeLimit, onIsTimeLimitChange, getExamDetail } =
    props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <SettingPageOne
            getExamDetail={getExamDetail}
            exam={exam}
            setExam={setExam}
            isTimeLimit={isTimeLimit}
            onIsTimeLimitChange={onIsTimeLimitChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CandidateExperience exam={exam} setExam={setExam} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExamSetting;
