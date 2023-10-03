import React from "react";
import css from "../EditExam.module.css";
import { Box, Typography } from "@mui/material";
import QuestionCard from "./QuestionCard";
import { questionCard_Type } from "../../../../utils/utils";
const SelectedChallenges = (props) => {
  const { questions, getExamDetail, removeQuestion } = props;
  return (
    <Box className={css.gridBox}>
      <Box className={css.topHeading}>
        <Typography className={css.topHeadingText}>
          Selected challenges
        </Typography>
      </Box>
      <Box className={css.queCardBox}>
        {questions &&
          questions.map((question, i) => {
            return (
              <QuestionCard
                key={i}
                question={question}
                SelectedChallenge={questionCard_Type.CHALLENGES}
                getExamDetail={getExamDetail}
                onClick={removeQuestion}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default SelectedChallenges;
