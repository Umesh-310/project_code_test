import React, { useState } from "react";
import { toast } from "react-toastify";

const Page2InitCode = ({ previousPage, onSubmit, que, setQue }) => {
  const [loading, setLoading] = useState(false);

  const onChangeHanlder = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setQue({ ...que, [inputName]: inputValue });
  };

  const validateFormHandler = () => {
    return true;
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
        <h3 className="custom-modal-title mb-3">
          Init Code Details{" "}
          <span
            style={{ color: "blue", fontSize: "16px", fontWeight: "normal" }}
          >
            * Optional
          </span>
        </h3>
      </div>
      <div>
        <form className="" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label
              htmlFor="python_init_code"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Python Init Code
            </label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="python_init_code"
                className="form-control"
                id="python_init_code"
                style={{ maxHeight: "350px", height: "200px" }}
                value={que.python_init_code}
                onChange={onChangeHanlder}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="javascript_init_code"
              className="col-md-4 col-lg-3 col-form-label  custom-form-label-secondary"
            >
              Javascript Init Code
            </label>
            <div className="col-md-8 col-lg-9">
              <textarea
                name="javascript_init_code"
                className="form-control"
                id="javascript_init_code"
                style={{ maxHeight: "350px", height: "200px" }}
                value={que.javascript_init_code}
                onChange={onChangeHanlder}
              />
            </div>
          </div>
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

export default Page2InitCode;
