import { useState } from "react";
import Page1Question from "./Page1Question";
import Page2InitCode from "./Page2InitCode";
import Page3Testcase from "./Page3Testcase";

const WizardForm = ({ onCreateQue }) => {
  const [que, setQue] = useState({
    level: "Easy",
    title: "",
    description: "",
    example: "",
    is_private: false,
    exam_language: [],
  });
  const [testcase1, setTestcase1] = useState({ input: "", output: "" });
  const [testcase2, setTestcase2] = useState({ input: "", output: "" });
  const [testcase3, setTestcase3] = useState({ input: "", output: "" });
  const [testcase4, setTestcase4] = useState({ input: "", output: "" });
  const [testcase5, setTestcase5] = useState({ input: "", output: "" });
  const [page, setPage] = useState(1);

  const nextPageHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const previousPageHandler = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const onSubmitHandler = async () => {
    let body = {
      title: que.title,
      description: que.description,
      level: que.level,
      example: que.example,
      exam_language: que.exam_language,
      testcases: [
        { input: testcase1.input, output: testcase1.output, number: 1 },
        { input: testcase2.input, output: testcase2.output, number: 2 },
        { input: testcase3.input, output: testcase3.output, number: 3 },
        { input: testcase4.input, output: testcase4.output, number: 4 },
        { input: testcase5.input, output: testcase5.output, number: 5 },
      ],
    };
    await onCreateQue(body);
  };

  return (
    <div>
      {page === 1 && (
        <Page1Question onSubmit={nextPageHandler} que={que} setQue={setQue} />
      )}
      {/* {page === 2 && (
          <Page2InitCode
            previousPage={previousPageHandler}
            onSubmit={nextPageHandler}
            que={que}
            setQue={setQue}
          />
        )} */}
      {page === 2 && (
        <Page3Testcase
          previousPage={previousPageHandler}
          onSubmit={onSubmitHandler}
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
        />
      )}
    </div>
  );
};

export default WizardForm;
