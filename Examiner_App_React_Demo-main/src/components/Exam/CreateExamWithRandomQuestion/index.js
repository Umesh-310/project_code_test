import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import CreateExamWithRandomQuestionForm from "./CreateExamWithRandomQuestionForm";
import { loadCookies } from "../../../utils/Cookies";
import PageTitlesCreate from "../../../utils/PageTitlesCreate";

const breadcrumb = [
  { url: "/account/dashboard", title: "Home" },
  { url: "/exam/all_exam", title: "Exams" },
  {
    url: "/exam/create_exam_with_random_question",
    title: "Create New Exam with Random Question",
  },
];

const CreateExamWithRandomQuestion = () => {
  const navigate = useNavigate();

  const onCreateExam = async (body) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.post(
        `/api/examiner/create_exam_with_random_questions/`,
        body,
        { headers }
      );
      if (response.status === 201) {
        toast.success(response.data.msg);
        navigate("/exam/all_exam/");
      } else {
        toast.error("Server Error");
      }
    } catch (error) {
      toast.error(error.response.data.detail);
    }
  };

  return (
    <>
      <main id="main" className="main">
        <PageTitlesCreate
          title="Create New Exam with Random Question"
          breadcrumb={breadcrumb}
        />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Create New Exam with Random Question
                  </h5>
                  <CreateExamWithRandomQuestionForm
                    onCreateExam={onCreateExam}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateExamWithRandomQuestion;
