import React, { useState } from "react";
import { toast } from "react-toastify";
//delete
const Page3Testcase = ({
  onSubmit,
  previousPage,
  testcase1,
  setTestcase1,
  testcase2,
  setTestcase2,
  testcase3,
  setTestcase3,
  testcase4,
  setTestcase4,
  testcase5,
  setTestcase5,
}) => {
  const [loading, setLoading] = useState(false);

  const setTestcase1Handler = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setTestcase1({ ...testcase1, [inputName]: inputValue });
  };

  const setTestcase2Handler = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setTestcase2({ ...testcase2, [inputName]: inputValue });
  };

  const setTestcase3Handler = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setTestcase3({ ...testcase3, [inputName]: inputValue });
  };

  const setTestcase4Handler = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setTestcase4({ ...testcase4, [inputName]: inputValue });
  };

  const setTestcase5Handler = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setTestcase5({ ...testcase5, [inputName]: inputValue });
  };

  const validateFormHandler = () => {
    const curTestcase1 = {
      input: testcase1?.input?.trim(),
      output: testcase1?.output?.trim(),
      number: 1,
    };
    const curTestcase2 = {
      input: testcase2?.input?.trim(),
      output: testcase2?.output?.trim(),
      number: 2,
    };
    const curTestcase3 = {
      input: testcase3?.input?.trim(),
      output: testcase3?.output?.trim(),
      number: 3,
    };
    const curTestcase4 = {
      input: testcase4?.input?.trim(),
      output: testcase4?.output?.trim(),
      number: 4,
    };
    const curTestcase5 = {
      input: testcase5?.input?.trim(),
      output: testcase5?.output?.trim(),
      number: 5,
    };

    if (
      curTestcase1.input === "" ||
      curTestcase1.output === "" ||
      curTestcase2.input === "" ||
      curTestcase2.output === "" ||
      curTestcase3.input === "" ||
      curTestcase3.output === "" ||
      curTestcase4.input === "" ||
      curTestcase4.output === "" ||
      curTestcase5.input === "" ||
      curTestcase5.output === ""
    ) {
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
      toast.error("Please enter all Testcases details...");
    } else {
      await onSubmit();
    }
    setLoading(false);
  };
  return (
    <>
      <div className="">
        <h3 className="custom-modal-title mb-3">Testcases Details</h3>
      </div>
      <div>
        <form className="" onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label
              className="col-form-label custom-form-label"
              style={{ fontSize: "20px" }}
            >
              Testcase 1{" "}
            </label>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase1input"
                className="form-label custom-form-label-secondary"
              >
                Input{" "}
              </label>
              <textarea
                name="input"
                className="form-control"
                id="testcase1input"
                value={testcase1.input}
                onChange={setTestcase1Handler}
              />
            </div>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase1input"
                className="form-label custom-form-label-secondary"
              >
                Ouput{" "}
              </label>
              <textarea
                name="output"
                className="form-control"
                id="testcase1input"
                value={testcase1.output}
                onChange={setTestcase1Handler}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              className="col-form-label custom-form-label"
              style={{ fontSize: "20px" }}
            >
              Testcase 2{" "}
            </label>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase2input"
                className="form-label custom-form-label-secondary"
              >
                Input{" "}
              </label>
              <textarea
                name="input"
                className="form-control"
                id="testcase2input"
                value={testcase2.input}
                onChange={setTestcase2Handler}
              />
            </div>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase2input"
                className="form-label custom-form-label-secondary"
              >
                Ouput{" "}
              </label>
              <textarea
                name="output"
                className="form-control"
                id="testcase2input"
                value={testcase2.output}
                onChange={setTestcase2Handler}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              className="col-form-label custom-form-label"
              style={{ fontSize: "20px" }}
            >
              Testcase 3{" "}
            </label>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase3input"
                className="form-label custom-form-label-secondary"
              >
                Input{" "}
              </label>
              <textarea
                name="input"
                className="form-control"
                id="testcase3input"
                value={testcase3.input}
                onChange={setTestcase3Handler}
              />
            </div>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase3input"
                className="form-label custom-form-label-secondary"
              >
                Ouput{" "}
              </label>
              <textarea
                name="output"
                className="form-control"
                id="testcase3input"
                value={testcase3.output}
                onChange={setTestcase3Handler}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              className="col-form-label custom-form-label"
              style={{ fontSize: "20px" }}
            >
              Testcase 4{" "}
            </label>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase4input"
                className="form-label custom-form-label-secondary"
              >
                Input{" "}
              </label>
              <textarea
                name="input"
                className="form-control"
                id="testcase4input"
                value={testcase4.input}
                onChange={setTestcase4Handler}
              />
            </div>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase4input"
                className="form-label custom-form-label-secondary"
              >
                Ouput{" "}
              </label>
              <textarea
                name="output"
                className="form-control"
                id="testcase4input"
                value={testcase4.output}
                onChange={setTestcase4Handler}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label
              className="col-form-label custom-form-label"
              style={{ fontSize: "20px" }}
            >
              Testcase 5{" "}
            </label>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase5input"
                className="form-label custom-form-label-secondary"
              >
                Input{" "}
              </label>
              <textarea
                name="input"
                className="form-control"
                id="testcase5input"
                value={testcase5.input}
                onChange={setTestcase5Handler}
              />
            </div>
            <div className="col-md-6 col-lg-6">
              <label
                htmlFor="testcase5input"
                className="form-label custom-form-label-secondary"
              >
                Ouput{" "}
              </label>
              <textarea
                name="output"
                className="form-control"
                id="testcase5input"
                value={testcase5.output}
                onChange={setTestcase5Handler}
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
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Page3Testcase;
