import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import css from "./EditExam.module.css";
import AllQuestion from "./EditExamComponents/AllQuestion";
import SelectedChallenges from "./EditExamComponents/SelectedChallenges";
const EditExamChallenges = (props) => {
  const { selectedQue, addQuestion, removeQuestion, getExamDetail } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Box className={css.gridBox}>
          <Box className={css.topHeading}>
            <Typography className={css.topHeadingText}>Filter</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <AllQuestion addQuestion={addQuestion} getExamDetail={getExamDetail} />
      </Grid>
      <Grid item xs={4}>
        <SelectedChallenges
          questions={selectedQue}
          removeQuestion={removeQuestion}
          getExamDetail={getExamDetail}
        />
      </Grid>
    </Grid>
    // </Box>
  );
};

export default EditExamChallenges;
