import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { loadCookies } from "../../../utils/Cookies";
import QuestionTable3 from "./QuestionTable3";
import { useNavigate } from "react-router-dom";

const Page3Question = ({
  onSubmit,
  previousPage,
  exam,
  setExam,
  selectedQue,
  addQuestion,
  removeQuestion,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [questionByOption, setQuestionByOption] = useState("all");
  const [isFinalSubmit, setIsFinalSubmit] = useState(false);

  const navigate = useNavigate();

  const onSearchChange = async (e) => {
    if (questionByOption === "all") {
      await getAllQuestion(e.target.value);
    } else if (questionByOption === "my") {
      await getMyQuestion(e.target.value);
    }
  };

  const onQuestionByOptionChange = async (e) => {
    if (questionByOption === "all") {
      setQuestionByOption("my");
      await getMyQuestion();
    } else if (questionByOption === "my") {
      setQuestionByOption("all");
      await getAllQuestion();
    }
  };

  const getAllQuestion = async (search = "") => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/author/questionlist/?search=${search}`,
        { headers },
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const getMyQuestion = async (search = "") => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/author/questionlist_by_me/?search=${search}`,
        { headers },
      );
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
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
      toast.error("Please select atleast 1 question...");
    } else {
      if (
        window.confirm(
          "Are you sure? \nYou will not be allowed to change questions after you submit....",
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
    getAllQuestion();
  }, []);

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

          <QuestionTable3
            data={data}
            selectedQue={selectedQue}
            addQuestion={addQuestion}
            removeQuestion={removeQuestion}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="button"
              className="btn btn-primary previous"
              onClick={previousPage}
            >
              Previous
            </button>
            {loading ? (
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
