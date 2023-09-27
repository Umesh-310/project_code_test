import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PercentIcon from "@mui/icons-material/Percent";
import LanguageSelect from "../../../../utils/LanguageSelect.js";

import css from "../EditExam.module.css";
import {
  all_language_arr,
  assessmentOC_text,
  hours,
  minutes,
  modules,
} from "../../../../utils/utils";
import {
  activateExamHandler,
  deletionExamHandler,
} from "../../../../utils/Api.js";
import { useNavigate } from "react-router-dom";
import ConfirmModel from "../../../Modal/ConfirmModel.js";
import DefaultModel from "../../../Modal/DefaultModel.js";
const LanguageValues = all_language_arr.map((val) => val.key);

const SettingPageOne = (props) => {
  const { exam, setExam, isTimeLimit, onIsTimeLimitChange, getExamDetail } =
    props;
  const [language, setLanguage] = useState(LanguageValues);
  const [confOpen, setConfOpen] = useState(false);
  const [defOpen, setDefOpen] = useState(false);
  const [error, setError] = useState("");
  const [deleteConf, setDeleteConf] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (exam?.exam_language && exam?.exam_language?.length !== 0) {
      setLanguage(exam?.exam_language);
    }
  }, [exam?.exam_language]);

  const onChangeHanlder = async (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (e.target.name === "is_time_limit") {
      inputValue = e.target.checked;
    }
    if (e.target.name === "is_date_limit") {
      inputValue = e.target.checked;
    }
    if (e.target.name === "total_question") {
      inputValue = parseInt(e.target.value);
    }

    setExam({ ...exam, [inputName]: inputValue });
  };

  const handleLangChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value.includes("select-all")) {
      setLanguage(LanguageValues);
      setExam({ ...exam, exam_language: LanguageValues });
    } else if (value.includes("deselect-all")) {
      setLanguage([]);
      setExam({ ...exam, exam_language: [] });
    } else {
      const tempLanguage = typeof value === "string" ? value.split(",") : value;
      setLanguage(tempLanguage);
      setExam({ ...exam, exam_language: tempLanguage });
    }
  };

  const handleConfirmOpen = () => setConfOpen(true);
  const handelDefaultModel = () => setDefOpen(true);

  const setDeleteTitle = ({ target }) => {
    const value = target.value;
    setDeleteConf(value);
    setError("");
  };
  const onOpenCloseExam = async () => {
    setDefOpen(false);
    const response = await activateExamHandler(exam, navigate);
    if (response && response?.status === 200) {
      toast.success(response.data.msg);
      getExamDetail();
    } else {
      toast.error("Server Error");
    }
  };

  const onDeleteExam = async () => {
    const title = exam.title.toLocaleUpperCase();
    if (title === deleteConf) {
      setConfOpen(false);
      const response = await deletionExamHandler(exam, navigate);
      if (response.status === 200) {
        toast.success(response.data.msg);
        navigate("/exam/all_exam");
      } else {
        toast.error("Server Error");
      }
    } else {
      setError("Type the Correct Title to confirm the deletion");
    }
  };

  return (
    <Box className={css.gridBox}>
      <ConfirmModel
        open={confOpen}
        handleClose={() => setConfOpen(false)}
        onClick={onDeleteExam}
        message={`To CONFIRM the deletion, please type the exam title [${exam?.title.toLocaleUpperCase()}] in capital letters.`}
        closeBtn="cancel"
        arrgeBtn="CONFIRM"
        onChange={setDeleteTitle}
        placeholder="CONFIRM"
        error={error}
      />
      <DefaultModel
        open={defOpen}
        handleClose={() => setDefOpen(false)}
        onClick={onOpenCloseExam}
        message={assessmentOC_text(!exam?.is_active)}
        closeBtn="Cancel"
        arrgeBtn={!exam?.is_active ? "Activate" : "Deactivate"}
      />
      <Box className={css.topHeading}>
        <Typography className={css.topHeadingText}>
          Assessment settings
        </Typography>
      </Box>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Title</Typography>
        <TextField
          type=""
          fullWidth
          variant="standard"
          name="title"
          id="title"
          value={exam.title}
          onChange={onChangeHanlder}
        />
      </Box>
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Description</Typography>
        <ReactQuill
          theme="snow"
          style={{ marginTop: "10px" }}
          modules={modules}
          placeholder="write your content ...."
          value={exam.description}
          onChange={(e) => console.log(e)}
        />
      </Box>
      <Divider component="p" sx={{ margin: "4px 0px" }} />

      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Time limit</Typography>
        <FormControlLabel
          control={
            <Checkbox
              id="is_time_limit"
              name="is_time_limit"
              checked={exam?.is_time_limit && "checked"}
              onChange={onChangeHanlder}
              onClick={onIsTimeLimitChange}
            />
          }
          label="Is Time Limit"
        />
        {exam?.is_time_limit && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  id="time_limit"
                  name="time_limit_hour"
                  value={exam.time_limit_hour}
                  onChange={onChangeHanlder}
                >
                  {hours.map((val, i) => {
                    return (
                      <MenuItem key={i} value={val}>
                        {val} Hours
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Select
                  id="time_limit"
                  name="time_limit_minute"
                  value={exam.time_limit_minute}
                  onChange={onChangeHanlder}
                >
                  {minutes.map((val, i) => {
                    return (
                      <MenuItem key={val} value={val}>
                        {val.toString().padStart(2, "0")} Minutes
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Box>
      <Box className={css.boxArea}>
        <FormControlLabel
          control={
            <Checkbox
              id="is_date_limit"
              name="is_date_limit"
              checked={exam?.is_date_limit && "checked"}
              onChange={onChangeHanlder}
              // onClick={onIsTimeLimitChange}
            />
          }
          label="Is Date Limit"
        />
        {exam?.is_date_limit && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography className={css.headingText}>Start Time</Typography>
              <TextField
                fullWidth
                type="datetime-local"
                name="start_time"
                id="start_time"
                value={exam.start_time}
                onChange={onChangeHanlder}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography className={css.headingText}>End Time</Typography>
              <TextField
                fullWidth
                type="datetime-local"
                id="end_time"
                name="end_time"
                value={exam.end_time}
                onChange={onChangeHanlder}
              />
            </Grid>
          </Grid>
        )}
      </Box>
      <Divider component="p" sx={{ margin: "4px 0px" }} />
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Score</Typography>
        <Typography variant="h6" className={css.smallHeadingText}>
          The minimum score a candidate needs to qualify.{" "}
        </Typography>
        <TextField
          type="number"
          sx={{ width: "50%" }}
          name="passing_percent_mark"
          id="passing_percent_mark"
          value={exam.passing_percent_mark}
          onChange={onChangeHanlder}
          InputProps={{
            inputProps: {
              max: 100,
              min: 10,
            },
            startAdornment: (
              <InputAdornment position="start">
                <PercentIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Divider component="p" sx={{ margin: "4px 0px" }} />
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Language</Typography>
        <Typography variant="h6" className={css.smallHeadingText}>
          These languages are supported in the exam. default (All)
        </Typography>
        <LanguageSelect handleChange={handleLangChange} language={language} />
      </Box>
      <Divider component="p" sx={{ margin: "4px 0px" }} />
      <Box className={css.boxArea}>
        <Typography className={css.headingText}>Danger zone</Typography>
        <Box className={css.BottomBtnGroup}>
          {!exam?.is_deleted ? (
            <Button
              onClick={handleConfirmOpen}
              sx={{ fontWeight: 800 }}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
          ) : (
            <Button
              onClick={handleConfirmOpen}
              sx={{ fontWeight: 800 }}
              color="warning"
              variant="outlined"
            >
              Restore
            </Button>
          )}
          <Button
            onClick={handelDefaultModel}
            sx={{
              color: "gray",
              fontWeight: 800,
              borderColor: "gray",
              "&:hover": {
                backgroundColor: "transparent",
                border: "1px solid gray",
              },
            }}
            variant="outlined"
          >
            {exam?.is_active && "Close"}
            {!exam?.is_active && "Open"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingPageOne;
