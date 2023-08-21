import React from "react";
// import { Header, Footer } from "../../components";
import css from "./candidateGuide.module.css";
import Rules from "../../components/Rules";
const CandidateData = [
  {
    id: 1,
    heading: "Starting the assessment",
    rule: `The first thing you'll see when you click the link for your assessment is the screen below. You'll be asked to enter in your name and email address so that your organization can track your progress.`,
    image: "/assets/img/ss/a1.png",
  },
  {
    id: 2,
    heading: "Exam descriptions",
    rule: `When you click "Begin Assessment" you will then see a screen similar to the one below. This is where your organization can provide some instructions on what to expect from the assessment. You can also see how much time you'll have to complete the entire assessment on the left-hand side.`,
    image: "/assets/img/ss/a2.png",
  },
  {
    id: 3,
    heading: "Select Entire Screen to share",
    rule: `You have to Select Entire screen share Option to start Exam and Allow System to Record Entire Screen.`,
    image: "/assets/img/ss/a3.png",
  },
  {
    id: 4,
    heading: "You've started the assessment",
    rule: `Once you've clicked "Begin Assessment" you will see a screen similar to the one below. This is your entire assessment and it is where you'll be presented with the following questions and challenges depending on how your organization created the assessment.`,
    image: "/assets/img/ss/a4.png",
  },
  {
    id: 5,
    heading: "How the Coderbyte editor works",
    rule: `You have to Select Entire screen share Option to start Exam and Allow System to Record Entire Screen.`,
    image: "/assets/img/ss/a5.png",
  },
  {
    id: 6,
    heading: "Complete Code and Submit",
    rule: `The editor will have a challenge description on the left-hand side along with some sample test cases (if any exist for the challenge). Your goal is to modify the code so that it outputs the correct answers. When you are done writing your solution, make sure you click "Submit" to submit your solution for grading.`,
    image: "/assets/img/ss/a6.png",
  },
  {
    id: 7,
    heading: "Once you've finished the assessment",
    rule: `When you've finally answered all the questions and solved all the coding challenges, you can go ahead and click the big green button titled "Submit Assessment." This will mark your assessment status as Submitted so your organization is aware and you will then see the screen below.`,
    image: "/assets/img/ss/a7.png",
  },
  {
    id: 8,
    heading: "Post-assessment",
    rule: `After Timing Completed Exam will be Automatically Submmited. After you submit your assessment, you don't have to do anything else and your organization should be in touch with your afterwards regarding next steps.`,
    image: "/assets/img/ss/a8.png",
  },
];
const CandidateGuidePage = () => {
  return (
    <>
      {/* <Header /> */}
      <section className={css.main}>
        <div className={css.heroSection}>
          <h1 className="custom-form-label" style={{ fontWeight: "bold" }}>
            Candidate guide
          </h1>
          <h5>
            Below is some helpful information about the platform so that you
            have a positive experience when taking your assessment.
          </h5>
        </div>
        <Rules rules={CandidateData} />
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default CandidateGuidePage;
