import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import css from "../EditExam.module.css";

const CandidateExperience = () => {
  return (
    <Box className={css.gridBox}>
      <Box className={css.topHeading}>
        <Typography className={css.topHeadingText}>
          Candidate experience
        </Typography>
      </Box>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Challenges</Typography>
      </Box>

      <Divider component="p" sx={{ margin: "4px 0px" }} />

      <Divider component="p" sx={{ margin: "4px 0px" }} />
    </Box>
  );
};

export default CandidateExperience;
