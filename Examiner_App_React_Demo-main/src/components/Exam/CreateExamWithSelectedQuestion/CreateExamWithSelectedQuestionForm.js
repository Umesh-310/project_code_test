import { useState } from "react";
import PropTypes from "prop-types";
import Page1Exam from "./Page1Exam";
import Page2ExamTime from "./Page2ExamTime";
import Page3Question from "./Page3Question";

const WizardForm = ({ onCreateExam }) => {
  const [exam, setExam] = useState({
    title: "",
    description: "",
    passing_percent_mark: 0,
    total_question: 0,
    is_time_limit: false,
    time_limit_hour: 0,
    time_limit_minute: 0,
    start_time: null,
    end_time: null,
    questions: [],
  });
  const [isTimeLimit, setIsTimeLimit] = useState(false);
  const [selectedQue, setSelectedQue] = useState([]);
  const [page, setPage] = useState(1);

  const onIsTimeLimitChange = () => {
    setIsTimeLimit(!isTimeLimit);
  };

  const addQuestion = (e, id) => {
    setExam({ ...exam, ["total_question"]: exam.total_question + 1 });
    setSelectedQue([...selectedQue, id]);
  };

  const removeQuestion = (e, id) => {
    setExam({ ...exam, ["total_question"]: exam.total_question - 1 });
    setSelectedQue(selectedQue.filter((el) => el !== id));
  };

  const nextPageHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const previousPageHandler = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const onSubmitHandler = async () => {
    const questions = selectedQue.map((que, i) => {
      return { question: que, number: i + 1 };
    });

    let body = {
      title: exam.title,
      description: exam.description,
      passing_percent_mark: exam.passing_percent_mark,
      total_question: exam.total_question,
      is_time_limit: exam.is_time_limit,
      time_limit_hour: exam.is_time_limit ? exam.time_limit_hour : 0,
      time_limit_minute: exam.is_time_limit ? exam.time_limit_minute : 0,
      start_time: exam.start_time,
      end_time: exam.end_time,
      questions: questions,
    };
    await onCreateExam(body);
  };

  return (
    <div>
      {page === 1 && (
        <Page1Exam onSubmit={nextPageHandler} exam={exam} setExam={setExam} />
      )}
      {page === 2 && (
        <Page2ExamTime
          previousPage={previousPageHandler}
          onSubmit={nextPageHandler}
          exam={exam}
          setExam={setExam}
          isTimeLimit={isTimeLimit}
          onIsTimeLimitChange={onIsTimeLimitChange}
        />
      )}
      {page === 3 && (
        <Page3Question
          previousPage={previousPageHandler}
          onSubmit={onSubmitHandler}
          exam={exam}
          setExam={setExam}
          selectedQue={selectedQue}
          addQuestion={addQuestion}
          removeQuestion={removeQuestion}
        />
      )}
    </div>
  );
};

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default WizardForm;
