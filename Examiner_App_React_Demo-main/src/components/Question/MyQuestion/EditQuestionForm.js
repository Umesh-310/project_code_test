import { useState } from "react";

import Page1Question from "./Page1Question";
import Page2InitCode from "./Page2InitCode";
import Page3Testcase from "./Page3Testcase";

const WizardForm = ({
  que,
  setQue,
  onQuestionUpdateHandler,
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
  onTestcaseUpdateHandler,
  onSubmitHandler,
}) => {
  const [page, setPage] = useState(1);

  const nextPageHandler = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const previousPageHandler = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      {page === 1 && (
        <Page1Question onSubmit={nextPageHandler} que={que} setQue={setQue} />
      )}
      {page === 2 && (
        <Page2InitCode
          previousPage={previousPageHandler}
          onSubmit={nextPageHandler}
          que={que}
          setQue={setQue}
        />
      )}
      {page === 3 && (
        <Page3Testcase
          previousPage={previousPageHandler}
          onSubmit={onSubmitHandler}
          que={que}
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
        />
      )}
    </div>
  );
};

export default WizardForm;
