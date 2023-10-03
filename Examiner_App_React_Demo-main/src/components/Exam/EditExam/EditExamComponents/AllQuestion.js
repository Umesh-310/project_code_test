import React, { useEffect } from "react";
import css from "../EditExam.module.css";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetAllQuestion } from "../../../../store/questionSlice";
import QuestionCard from "./QuestionCard";
import { questionCard_Type } from "../../../../utils/utils";

const AllQuestion = (props) => {
  const { getExamDetail, addQuestion } = props;
  const dispatch = useDispatch();
  const { allQuestion, loading } = useSelector((state) => state.question);

  useEffect(() => {
    dispatch(GetAllQuestion());
  }, [dispatch]);
  return (
    <Box className={css.gridBox}>
      <Box className={css.topHeading}>
        <Typography className={css.topHeadingText}>
          Challenge library
        </Typography>
      </Box>
      <Box className={css.queCardBox}>
        {allQuestion &&
          allQuestion.map((question, i) => (
            <QuestionCard
              key={i}
              question={question}
              SelectedChallenge={questionCard_Type.LIBRARY}
              getExamDetail={getExamDetail}
              onClick={addQuestion}
            />
          ))}
      </Box>
    </Box>
  );
};

export default AllQuestion;
