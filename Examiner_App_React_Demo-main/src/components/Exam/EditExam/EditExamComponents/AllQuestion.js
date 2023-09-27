import React from "react";
import css from "../EditExam.module.css";
import { Box, Typography } from "@mui/material";

const AllQuestion = () => {
  return (
    <Box className={css.gridBox}>
      <Box className={css.topHeading}>
        <Typography className={css.topHeadingText}>
          Challenge library
        </Typography>
        
      </Box>
    </Box>
  );
};

export default AllQuestion;
