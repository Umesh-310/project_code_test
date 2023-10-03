import { Typography } from "@mui/material";
import css from "../EditExam.module.css";
const LevelBage = ({ level }) => {
  const levelCss =
    level === "Easy" ? css.easy : level === "Hard" ? css.hard : css.medium;
  return (
    <Typography className={`${css.questionLevel} ${levelCss}`}>
      {level}
    </Typography>
  );
};

export default LevelBage;
