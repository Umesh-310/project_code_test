import { Box, Chip, Typography } from "@mui/material";
import React from "react";
import { language_obj, languagesSvg } from "../../../../utils/utils";
const QuestionCardLangChip = ({ Language, show }) => {
  const boxCss = { display: "flex", gap: "5px" };
  const chipCss = {
    padding: "0px 2px",
    borderRadius: "5px",
    height: "20px",
    textAlign: "center",
    alignItems: "center",
  };
  const lengthCheck = Language.length >= show;
  const lengthEqu = Language.length === show;
  const hasAllLang = Language.length === Object.keys(language_obj).length;

  return (
    <Typography variant="body2" color={"GrayText"} sx={{ ...boxCss }}>
      Language:
      <Box sx={boxCss}>
        {!hasAllLang &&
          lengthCheck &&
          Language.slice(0, show).map((lang) => {
            return <Chip key={lang} sx={chipCss} label={language_obj[lang]} />;
          })}
        {!hasAllLang && lengthCheck && !lengthEqu && (
          <Chip sx={chipCss} label={`+${Language.length - show}`} />
        )}
        {hasAllLang && <Chip sx={chipCss} label="any Language" />}
      </Box>
    </Typography>
  );
};

export default QuestionCardLangChip;
