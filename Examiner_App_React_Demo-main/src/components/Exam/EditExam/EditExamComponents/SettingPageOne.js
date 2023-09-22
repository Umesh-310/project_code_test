import { Box, Typography } from "@mui/material";
import React from "react";
import css from "../EditExam.module.css";

const SettingPageOne = () => {
  return (
    <Box className={css.gridBox}>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Time limit</Typography>
      </Box>
    </Box>
  );
};

export default SettingPageOne;
