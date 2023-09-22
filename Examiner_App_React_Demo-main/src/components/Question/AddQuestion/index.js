import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import PageTitle from "./PageTitle";
import AddQuestionForm from "./AddQuestionForm";
import { createQuestion } from "../../../store/questionSlice";
import PageTitlesCreate from "../../../utils/PageTitlesCreate";

const breadcrumb = [
  { url: "/account/dashboard", title: "Home" },
  { url: "/question/add_question", title: "Add New Question" },
];

const AddQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // create Question
  const onCreateQue = async (body) => {
    await createQuestion(dispatch, body, navigate);
  };

  return (
    <>
      <main id="main" className="main custom-main">
        <PageTitlesCreate title="Add New Question" breadcrumb={breadcrumb} />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Add New Question</h5>
                  <AddQuestionForm onCreateQue={onCreateQue} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AddQuestion;
