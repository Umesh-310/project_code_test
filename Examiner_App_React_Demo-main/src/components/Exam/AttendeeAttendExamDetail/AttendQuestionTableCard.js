// for code editor
import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";

const extensions = {
  PYTHON3: [python()],
  JAVASCRIPT_NODE: [javascript({ jsx: true })],
};

const AttendQuestionTableCard = ({ attendQuestionDatas }) => {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <h4 style={{ fontWeight: "bold" }}>Answers Detail</h4>
        </div>
      </div>
      {attendQuestionDatas?.map((attendQuestionData) => {
        return (
          <div className="card mt-3 pt-2 pb-0" key={attendQuestionData?.id}>
            <div className="card-body">
              <div className="row mt-2 p-0">
                <div
                  className="col-4"
                  style={{ borderRight: "1px solid gray" }}
                >
                  <h5 className="card-text">
                    {attendQuestionData?.question?.title} &nbsp;
                    <span>
                      {attendQuestionData?.question?.level === "Easy" ? (
                        <p className="badge bg-success">
                          {attendQuestionData?.question?.level}
                        </p>
                      ) : attendQuestionData?.question?.level === "Medium" ? (
                        <p className="badge bg-warning">
                          {attendQuestionData?.question?.level}
                        </p>
                      ) : attendQuestionData?.question?.level === "Hard" ? (
                        <p className="badge bg-danger">
                          {attendQuestionData?.question?.level}
                        </p>
                      ) : (
                        <></>
                      )}
                    </span>
                  </h5>
                </div>
                <div
                  className="col-4"
                  style={{
                    borderRight: "1px solid #0c1f4d",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "baseline",
                  }}
                >
                  <h5 className="card-text">
                    {attendQuestionData?.is_submited
                      ? "Submited"
                      : "Not Submited"}
                  </h5>
                </div>
                <div
                  className="col-4"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "baseline",
                  }}
                >
                  <h5 className="card-text">{attendQuestionData?.language}</h5>
                  {attendQuestionData?.total_passed_testcase === 0 ? (
                    <p
                      className="btn btn-danger"
                      style={{ textAlign: "center" }}
                    >
                      {attendQuestionData?.total_passed_testcase} / 5
                    </p>
                  ) : attendQuestionData?.total_passed_testcase === 5 ? (
                    <p
                      className="btn btn-success"
                      style={{ alignItems: "center" }}
                    >
                      {attendQuestionData?.total_passed_testcase} / 5
                    </p>
                  ) : (
                    <p className="btn btn-warning">
                      {attendQuestionData?.total_passed_testcase} / 5
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-2 pt-2 pb-0">
                <CodeMirror
                  className="w-80"
                  value={
                    attendQuestionData?.answer != null
                      ? attendQuestionData?.answer
                      : " "
                  }
                  height="auto"
                  theme={darcula}
                  name="codeMirror"
                  extensions={extensions[attendQuestionData?.language]}
                  readOnly
                  type="textarea"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AttendQuestionTableCard;
