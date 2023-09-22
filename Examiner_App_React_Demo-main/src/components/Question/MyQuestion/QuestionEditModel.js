import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";

import EditQuestionForm from "./EditQuestionForm";

const QuestionEditModal = ({
  row,
  onQuestionUpdateHandler,
  onTestcaseUpdateHandler,
  onSubmitHandler,
}) => {
  const [loading, setLoading] = useState(false);
  const [que, setQue] = useState({
    id: "",
    level: "Easy",
    title: "",
    description: "",
    example: "",
    is_private: false,
    is_deleted: false,
    python_init_code: "",
    javascript_init_code: "",
    exam_language: [],
  });
  const [testcase1, setTestcase1] = useState({ input: "", output: "" });
  const [testcase2, setTestcase2] = useState({ input: "", output: "" });
  const [testcase3, setTestcase3] = useState({ input: "", output: "" });
  const [testcase4, setTestcase4] = useState({ input: "", output: "" });
  const [testcase5, setTestcase5] = useState({ input: "", output: "" });

  const onUpdateQuestion = async (e) => {
    setLoading(true);
    await onSubmitHandler(
      e,
      que,
      testcase1,
      testcase2,
      testcase3,
      testcase4,
      testcase5
    );
    setLoading(false);
  };
  useEffect(() => {
    setQue({
      id: row.id,
      title: row.title,
      description: row.description,
      level: row.level,
      example: row.example,
      is_private: row.is_private,
      is_deleted: row.is_deleted,
      exam_language: row?.exam_language,
    });
    setTestcase1({
      id: row.testcases[0].id,
      input: row.testcases[0].input,
      output: row.testcases[0].output,
      number: row.testcases[0].number,
    });
    setTestcase2({
      id: row.testcases[1].id,
      input: row.testcases[1].input,
      output: row.testcases[1].output,
      number: row.testcases[1].number,
    });
    setTestcase3({
      id: row.testcases[2].id,
      input: row.testcases[2].input,
      output: row.testcases[2].output,
      number: row.testcases[2].number,
    });
    setTestcase4({
      id: row.testcases[3].id,
      input: row.testcases[3].input,
      output: row.testcases[3].output,
      number: row.testcases[3].number,
    });
    setTestcase5({
      id: row.testcases[4].id,
      input: row.testcases[4].input,
      output: row.testcases[4].output,
      number: row.testcases[4].number,
    });
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#modalDialogScrollable-${row.id}`}
      >
        <Link to="" style={{ color: "white" }}>
          <EditIcon />
        </Link>
      </button>
      <div
        className="modal fade"
        id={`modalDialogScrollable-${row.id}`}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title custom-modal-title">
                Question Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditQuestionForm
                que={que}
                setQue={setQue}
                onQuestionUpdateHandler={onQuestionUpdateHandler}
                testcase1={testcase1}
                setTestcase1={setTestcase1}
                testcase2={testcase2}
                setTestcase2={setTestcase2}
                testcase3={testcase3}
                setTestcase3={setTestcase3}
                testcase4={testcase4}
                setTestcase4={setTestcase4}
                testcase5={testcase5}
                setTestcase5={setTestcase5}
                onTestcaseUpdateHandler={onTestcaseUpdateHandler}
                onSubmitHandler={onSubmitHandler}
              />
            </div>
            <div className="modal-footer">
              {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onUpdateQuestion}
                >
                  Update
                </button>
              )}
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

export default QuestionEditModal;
