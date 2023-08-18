import React, { useState } from "react";
import { toast } from "react-toastify";

const Page1Exam = ({ onSubmit, exam, setExam }) => {
  const [loading, setLoading] = useState(false);

  const onChangeHanlder = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (e.target.name === "total_question") {
      inputValue = parseInt(e.target.value);
    }
    setExam({ ...exam, [inputName]: inputValue });
  };

  const validateFormHandler = () => {
    const curTitle = exam?.title?.trim();
    const curDescription = exam?.description?.trim();
    if (curTitle === "" || curDescription === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validate = validateFormHandler();
    if (!validate) {
      toast.error("Please enter all details...");
    } else {
      await onSubmit();
    }
    setLoading(false);
  };

  return (
    <>
      <div className="">
        <h3 className="custom-modal-title mb-3">Exam Basic Details</h3>
      </div>
      <div>
        <form className="" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label
              htmlFor="title"
              className="col-md-4 col-lg-3 col-form-label custom-form-label-secondary"
            >
              Title
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="title"
                type="text"
                className="form-control"
                id="title"
                value={exam.title}
                onChange={onChangeHanlder}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="description"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Description
            </label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="description"
                className="form-control"
                id="description"
                style={{ maxHeight: "150px" }}
                value={exam.description}
                onChange={onChangeHanlder}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="passing_percent_mark"
              className="col-md-4 col-lg-3 col-form-label custom-form-label-secondary"
            >
              Passing Percent Mark
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="passing_percent_mark"
                type="number"
                className="form-control"
                id="passing_percent_mark"
                value={exam.passing_percent_mark}
                onChange={onChangeHanlder}
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="exam_link"
              className="col-md-4 col-lg-3 col-form-label custom-form-label-secondary"
            >
              Exam Link
            </label>
            <div className="col-md-8 col-lg-9">
              <input
                name="exam_link"
                type="text"
                className="form-control"
                id="exam_link"
                value={exam.exam_link}
                disabled
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              <button type="submit" className="btn btn-primary next">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Page1Exam;
