import { Box, Grid } from "@mui/material";
import React from "react";
import css from "./EditExam.module.css";
import AllQuestion from "./EditExamComponents/AllQuestion";
const EditExamChallenges = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box className={css.gridBox}>Filter</Box>
        </Grid>
        <Grid item xs={5}>
          <AllQuestion />
        </Grid>
        <Grid item xs={4}>
          <Box className={css.gridBox}></Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditExamChallenges;
