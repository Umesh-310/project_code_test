import React, { useEffect, useState } from "react";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import DefalutModel from "../../../Modal/DefalutModel";
import { QUE_SUBMIT_MESSAGE, LogoText } from "../../../../utils/utils";

const RightOutputDiv = ({
  isFinalSubmitLoading,
  submitCodeHandler,
  runCodeHandler,
  testcases,
  runTestcaseHandler,
  testcaseResults,
  passedTestcases,
  errorMsg,
  output,
  isCorrect,
  isError,
  isOutputLoading,
  isTestcaseOutputLoading,
}) => {
  const [isFinalSubmit, setIsFinalSubmit] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);

  const onSubmitHandler = (e) => {
    setConfirmModal(true);
  };
  useEffect(() => {
    setInputVal(testcases[0]?.input);
  }, [testcases]);

  return (
    <>
      <DefalutModel
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
        onClick={() => {
          setIsFinalSubmit(true);
        }}
        Title={<LogoText />}
        message={QUE_SUBMIT_MESSAGE}
        closeBtn="cancel"
        arrgeBtn="submit"
      />
      <div>
        <div className="row m-0 mt-3 ">
          <div
            className="row mb-3"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            {!isFinalSubmit ? (
              <>
                <button
                  type="button"
                  onClick={(e) => runCodeHandler(e, inputVal)}
                  className="btn btn-success m-0 p-1"
                  value="Run"
                  style={{ width: "auto", fontSize: "16px" }}
                >
                  <PlayArrowIcon sx={{ margin: "0px", padding: "0px" }} />
                  Run &nbsp;
                </button>
                <button
                  type="button"
                  onClick={runTestcaseHandler}
                  className="btn btn-secondary m-0 p-1"
                  style={{ width: "auto", fontSize: "16px" }}
                >
                  <PlaylistPlayIcon />
                  Run Testcases
                </button>
                <button
                  type="button"
                  onClick={(e) => onSubmitHandler(e)}
                  className="btn btn-secondary m-0 p-1"
                  style={{ width: "auto", fontSize: "16px" }}
                >
                  Submit
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => submitCodeHandler()}
                className="btn btn-secondary m-0 p-1"
                style={{ width: "auto", fontSize: "16px" }}
              >
                {isFinalSubmitLoading ? <> Loading... </> : "Final Submit"}
              </button>
            )}
          </div>
          {!isFinalSubmit ? (
            <input
              className="form-control mb-3"
              type="text"
              name="input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
          ) : (
            <></>
          )}
        </div>

        {isFinalSubmit ? (
          <></>
        ) : isOutputLoading ? (
          <h5>Loading...</h5>
        ) : (
          <>
            <div className="row m-0 p-0">
              {isCorrect ? (
                <div style={{ color: "green" }}>Ouput : {output}</div>
              ) : (
                <div>{output}</div>
              )}
              {isError ? (
                <div style={{ color: "red" }}>Error : {errorMsg}</div>
              ) : (
                <></>
              )}
            </div>
            {testcaseResults.length > 0 ? (
              <div
                className="row m-0 p-0"
                style={{
                  display: "flex",
                  justifyContent: "normal",
                  flexDirection: "column",
                }}
              >
                <h6 style={{ fontWeight: "bold", textAlign: "center" }}>
                  {" "}
                  RUNNING SAMPLE TEST CASES{" "}
                </h6>
                <hr />
                {testcaseResults.map((res, i) => {
                  return (
                    <>
                      <h6>== Input ==</h6>
                      <h6>{res.input}</h6>
                      <h6>== Ouput ==</h6>
                      <h6>{res.output}</h6>
                      <h6 style={{ color: "red" }}>{res.errorMsg}</h6>
                      <h6>== Status ==</h6>
                      {res.testcaseResult === true ? (
                        <h6>&lt;&lt; Correct &gt;&gt;</h6>
                      ) : (
                        <h6>
                          &lt;&lt; Wrong &gt;&gt;
                          <br />
                          &lt;&lt; Expected Ouput : {testcases[i].output}{" "}
                          &gt;&gt;
                        </h6>
                      )}
                      <hr />
                    </>
                  );
                })}
                <h6 style={{ textAlign: "center" }}> 3 TEST CASES HIDDEN </h6>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RightOutputDiv;
