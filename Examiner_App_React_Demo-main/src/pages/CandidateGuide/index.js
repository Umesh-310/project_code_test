import React from "react";
import { Header, Footer } from "../../components";
const CandidateGuidePage = () => {
  return (
    <>
      <Header />

      <main className="custom-main" style={{ padding: "50px 0px" }}>
        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-10 p-3">
            <h1 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Candidate guide
            </h1>
            <h5>
              Below is some helpful information about the platform so that you
              have a positive experience when taking your assessment.
            </h5>
          </div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a1.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-1
            </h2>
            <h4 style={{ fontWeight: "bold" }}>Starting the assessment</h4>
            <p>
              The first thing you'll see when you click the link for your
              assessment is the screen below. You'll be asked to enter in your
              name and email address so that your organization can track your
              progress.
            </p>
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-2
            </h2>
            <h4 style={{ fontWeight: "bold" }}>Exam descriptions</h4>
            <p>
              When you click "Begin Assessment" you will then see a screen
              similar to the one below. This is where your organization can
              provide some instructions on what to expect from the assessment.
              You can also see how much time you'll have to complete the entire
              assessment on the left-hand side.
            </p>
          </div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a2.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a3.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-3
            </h2>
            <h4 style={{ fontWeight: "bold" }}>
              Select Entire Screen to share
            </h4>
            <p>
              You have to Select Entire screen share Option to start Exam and
              Allow System to Record Entire Screen.
            </p>
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-4
            </h2>
            <h4 style={{ fontWeight: "bold" }}>
              You've started the assessment
            </h4>
            <p>
              Once you've clicked "Begin Assessment" you will see a screen
              similar to the one below. This is your entire assessment and it is
              where you'll be presented with the following questions and
              challenges depending on how your organization created the
              assessment.
            </p>
          </div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a4.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a5.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-5
            </h2>
            <h4 style={{ fontWeight: "bold" }}>
              How the Coderbyte editor works
            </h4>
            <p>
              You have to Select Entire screen share Option to start Exam and
              Allow System to Record Entire Screen.
            </p>
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-6
            </h2>
            <h4 style={{ fontWeight: "bold" }}>Complete Code and Submit</h4>
            <p>
              The editor will have a challenge description on the left-hand side
              along with some sample test cases (if any exist for the
              challenge). Your goal is to modify the code so that it outputs the
              correct answers. When you are done writing your solution, make
              sure you click "Submit" to submit your solution for grading.
            </p>
          </div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a6.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a7.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-7
            </h2>
            <h4 style={{ fontWeight: "bold" }}>
              Once you've finished the assessment
            </h4>
            <p>
              When you've finally answered all the questions and solved all the
              coding challenges, you can go ahead and click the big green button
              titled "Submit Assessment." This will mark your assessment status
              as Submitted so your organization is aware and you will then see
              the screen below.
            </p>
          </div>
          <div className="col-md-1"></div>
        </div>

        <div className="row p-3">
          <div className="col-md-1"></div>
          <div className="col-md-5 p-3">
            <h2 className="custom-form-label" style={{ fontWeight: "bold" }}>
              Step-8
            </h2>
            <h4 style={{ fontWeight: "bold" }}>Post-assessment</h4>
            <p>
              After Timing Completed Exam will be Automatically Submmited. After
              you submit your assessment, you don't have to do anything else and
              your organization should be in touch with your afterwards
              regarding next steps.
            </p>
          </div>
          <div className="col-md-5 p-3">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/ss/a8.png"}
              alt="..."
              style={{ width: "500px" }}
            />
          </div>
          <div className="col-md-1"></div>
        </div>
      </main>
    </>
  );
};

export default CandidateGuidePage;
