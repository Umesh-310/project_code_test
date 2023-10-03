import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";

// icons
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import QuestionCardLangChip from "./QuestionCardLangChip";
import LevelBage from "./LevelBage";
import css from "../EditExam.module.css";
import CollapseDescription from "./CollapseDescription";
import { questionCard_Type } from "../../../../utils/utils";
import QuestionEditModal from "../../../Question/MyQuestion/QuestionEditModel";
import QuestionDetailModal from "../../../Question/AllQuestion/QuestionDetailModal";

//Collapse
const QuestionCard = (props) => {
  const {
    question,
    SelectedChallenge,
    getExamDetail,
    onClick,
    onQuestionUpdateHandler,
    onTestcaseUpdateHandler,
    onSubmitHandler,
  } = props;
  const {
    id,
    title,
    description,
    question_language,
    level,
    created_at,
    number,
    is_active,
    is_deleted,
    is_private,
  } = question;
  const QuestionHandler = async (que) => {
    onClick && (await onClick(que));
    getExamDetail && (await getExamDetail());
  };

  return (
    <Card sx={{ boxShadow: "0px 0px 7px #0005" }}>
      <CardContent sx={{ padding: "8px 15px" }}>
        <Box className={css.questionCardHeader}>
          <Box className={css.questionTitleHeader}>
            <Typography className={css.questionTitle}>{title}</Typography> |
            <LevelBage level={level} />
          </Box>
          {SelectedChallenge === questionCard_Type.LIBRARY && (
            <Button
              onClick={() => QuestionHandler(question)}
              className={css.headerAddBtn}
            >
              <AddBoxIcon />
            </Button>
          )}
          {SelectedChallenge === questionCard_Type.CHALLENGES && (
            <Button
              onClick={() => QuestionHandler(id)}
              color="error"
              className={css.headerAddBtn}
            >
              <DeleteOutlineIcon />
            </Button>
          )}
          {SelectedChallenge === questionCard_Type.MY_QUESTION && (
            <Box sx={{ display: "flex", gap: "8px" }}>
              <Button
                onClick={() => QuestionHandler(question)}
                color={!is_deleted ? "error" : "warning"}
                className={css.headerAddBtn}
              >
                {!is_deleted ? <DeleteOutlineIcon /> : <RestoreFromTrashIcon />}
              </Button>

              <QuestionEditModal
                row={question}
                onQuestionUpdateHandler={onQuestionUpdateHandler}
                onTestcaseUpdateHandler={onTestcaseUpdateHandler}
                onSubmitHandler={onSubmitHandler}
              />
            </Box>
          )}
          {SelectedChallenge === questionCard_Type.ALL_QUESTION && (
            <QuestionDetailModal que={question} />
          )}
        </Box>
        <Box className={css.cardBody}>
          {(SelectedChallenge === questionCard_Type.LIBRARY ||
            SelectedChallenge === questionCard_Type.ALL_QUESTION ||
            SelectedChallenge === questionCard_Type.MY_QUESTION) && (
            <CollapseDescription description={description} />
          )}
          {SelectedChallenge === questionCard_Type.CHALLENGES && (
            <QuestionCardLangChip Language={question_language} show={1} />
          )}
        </Box>
      </CardContent>
      <CardActions className={css.examCardBottom}>
        {SelectedChallenge === questionCard_Type.LIBRARY && (
          <QuestionCardLangChip Language={question_language} show={2} />
        )}
        {SelectedChallenge === questionCard_Type.CHALLENGES && (
          <Typography variant="caption" color={"GrayText"}>
            {number}
          </Typography>
        )}
        <Box className={css.ExamDate}>
          <span>{moment(created_at).format("ll")}</span>
        </Box>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;
