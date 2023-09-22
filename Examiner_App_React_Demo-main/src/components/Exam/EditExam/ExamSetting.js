import { Box, Grid } from "@mui/material";
import React from "react";
import css from "./EditExam.module.css";
import SettingPageOne from "./EditExamComponents/SettingPageOne";

const ExamSetting = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <SettingPageOne />
        </Grid>
        <Grid item xs={6}>
          <Box className={css.gridBox}></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExamSetting;
