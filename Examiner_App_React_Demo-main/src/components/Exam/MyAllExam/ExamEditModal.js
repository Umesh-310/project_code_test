import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";

import EditExamWithSelectedQuestionForm from "./EditExamWithSelectedQuestionForm";

const ExamEditModal = ({ row, onExamUpdateHandler }) => {
  const [exam, setExam] = useState({
    id: "",
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

  const onSubmitHandler = async () => {
    const questions = selectedQue.map((que, i) => {
      return { question: que, number: i + 1 };
    });
    let body = {
      id: exam.id,
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
    await onUpdateExam(body);
  };

  const onUpdateExam = async (body) => {
    await onExamUpdateHandler(body);
  };

  useEffect(() => {
    setExam({
      ...exam,
      ["id"]: row.id,
      ["title"]: row.title,
      ["description"]: row.description,
      ["passing_percent_mark"]: row.passing_percent_mark,
      ["total_question"]: row.total_question,
      ["is_time_limit"]: row.is_time_limit,
      ["time_limit_hour"]: row.time_limit_hour,
      ["time_limit_minute"]: row.time_limit_minute,
      ["start_time"]: row.start_time?.toString().slice(0, 16),
      ["end_time"]: row.end_time?.toString().slice(0, 16),
      ["exam_link"]: row.exam_link,
    });

    setIsTimeLimit(row.is_time_limit);
    setSelectedQue(
      row.questions.map((que) => {
        return que.question;
      }),
    );
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#modalDialogScrollable-${exam.id}`}
      >
        <Link to="" style={{ color: "white" }}>
          <EditIcon />
        </Link>
      </button>
      <div
        className="modal fade"
        id={`modalDialogScrollable-${exam.id}`}
        tabIndex="-1"
        style={{ textAlign: "left" }}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title custom-modal-title">Exam Detail</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditExamWithSelectedQuestionForm
                exam={exam}
                setExam={setExam}
                selectedQue={selectedQue}
                addQuestion={addQuestion}
                removeQuestion={removeQuestion}
                onSubmitHandler={onSubmitHandler}
                isTimeLimit={isTimeLimit}
                onIsTimeLimitChange={onIsTimeLimitChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmitHandler}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ExamEditModal);
