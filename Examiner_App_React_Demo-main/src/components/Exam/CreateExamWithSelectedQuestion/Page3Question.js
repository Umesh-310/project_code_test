import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import QuestionTable3 from "./QuestionTable3";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllPublicQuestion,
  GetMyQuestion,
} from "../../../store/questionSlice";
import infinityloader from "../../../assets/svgs/infinityloader.svg";
const Page3Question = ({
  onSubmit,
  previousPage,
  exam,
  selectedQue,
  addQuestion,
  removeQuestion,
}) => {
  const [submitLoading, setLoading] = useState(false);
  const [questionByOption, setQuestionByOption] = useState("all");
  const [isFinalSubmit, setIsFinalSubmit] = useState(false);
  const dispatch = useDispatch();
  const { allPublicQuestion, myQuestion, loading } = useSelector(
    (state) => state.question
  );
  // const [data, setData] = useState([]);
  // const navigate = useNavigate();
  const onSearchChange = async (e) => {
    if (questionByOption === "all") {
      await dispatch(GetAllPublicQuestion(e.target.value));
    } else if (questionByOption === "my") {
      // await getMyQuestion(e.target.value);
      dispatch(GetMyQuestion(e.target.value));
    }
  };

  const onQuestionByOptionChange = async (e) => {
    if (questionByOption === "all") {
      setQuestionByOption("my");
      // await getMyQuestion();
      dispatch(GetMyQuestion());
    } else if (questionByOption === "my") {
      setQuestionByOption("all");
      await dispatch(GetAllPublicQuestion());
    }
  };

  const validateFormHandler = () => {
    if (selectedQue.length >= 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validate = validateFormHandler();
    if (!validate) {
      toast.error("Please select at least 1 question...");
    } else {
      if (
        window.confirm(
          "Are you sure? \nYou will not be allowed to change questions after you submit...."
        )
      ) {
        setIsFinalSubmit(true);
      }
    }
    setLoading(false);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validate = validateFormHandler();
    if (!validate) {
      toast.error("Please select atleast 1 question...");
    } else {
      await onSubmit();
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(GetAllPublicQuestion());
  }, [dispatch]);

  return (
    <>
      <div className="">
        <h3 className="custom-modal-title mb-3">Question Details</h3>
      </div>
      <div>
        <form className="">
          <div className="row">
            <div className="col-md-4">
              <h5 style={{ color: "blue" }}>
                Total Selected Questions : {exam.total_question}
              </h5>
            </div>
            <div className="col-md-4">
              <select
                name="level"
                className="form-select"
                id="level"
                value={questionByOption}
                onChange={onQuestionByOptionChange}
              >
                <option value="all">All Questions</option>
                <option value="my">My Questions</option>
              </select>
            </div>
            <div className="col-md-4">
              <div className="header">
                <div className="search-bar">
                  <form
                    className="search-form align-items-center"
                    method="POST"
                    action="#"
                  >
                    <input
                      type="text"
                      name="query"
                      placeholder="Search"
                      title="Enter search keyword"
                      onChange={onSearchChange}
                      style={{ width: "80%" }}
                    />
                    <i
                      className="bi bi-search"
                      style={{ marginLeft: "-30px" }}
                    ></i>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {!loading && (
            <QuestionTable3
              data={questionByOption === "my" ? myQuestion : allPublicQuestion}
              selectedQue={selectedQue}
              addQuestion={addQuestion}
              removeQuestion={removeQuestion}
            />
          )}
          {loading && (
            <img className="tableLoader" src={infinityloader} alt="loader" />
          )}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              className="btn btn-primary previous"
              onClick={previousPage}
            >
              Previous
            </button>
            {submitLoading ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ) : isFinalSubmit ? (
              <button
                type="button"
                className="btn btn-primary next"
                onClick={handleFinalSubmit}
              >
                Final Submit
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary next"
                onClick={handleSubmit}
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Page3Question;
