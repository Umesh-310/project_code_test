import { memo } from "react";
import { Box, Grid } from "@mui/material";
import QuestionCard from "../../Exam/EditExam/EditExamComponents/QuestionCard";
import { questionCard_Type } from "../../../utils/utils";

function EnhancedTable({
  data: rows,
  deletionHandler,
  onQuestionUpdateHandler,
  onTestcaseUpdateHandler,
  onSubmitHandler,
}) {
  if (rows.length <= 0) {
    return (
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <h3> No Data Found</h3>
      </Box>
    );
  } else {
    return (
      <Grid container spacing={3}>
        {rows &&
          rows.map((row, index) => {
            return (
              <Grid item xs={6} key={index}>
                <QuestionCard
                  question={row}
                  SelectedChallenge={questionCard_Type.MY_QUESTION}
                  onClick={deletionHandler}
                  onQuestionUpdateHandler={onQuestionUpdateHandler}
                  onTestcaseUpdateHandler={onTestcaseUpdateHandler}
                  onSubmitHandler={onSubmitHandler}
                />
              </Grid>
            );
          })}
      </Grid>
    );
  }
}

export default memo(EnhancedTable);
