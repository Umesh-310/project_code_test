import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PageTitle from "./PageTitle";
import QuestionTable3 from "./QuestionTable3";
import { getAllQuestion } from "../../../store/questionSlice";
import PageTitlesCreate from "../../../utils/PageTitlesCreate";

const breadcrumb = [
  { url: "/account/dashboard", title: "Home" },
  { url: "/question/all_question", title: "All Questions" },
];

const AllQuestion = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  let allQue = useSelector((state) => state.question.allQuestion);

  const onSearchChange = async (e) => {
    await getAllQue(e.target.value);
  };

  const getAllQue = async (search = "") => {
    await getAllQuestion(dispatch, navigate, search);
  };

  useEffect(() => {
    getAllQue();
    setData(allQue);
  }, []);

  return (
    <>
      <main id="main" className="main custom-main">
        <PageTitlesCreate title="All Questions" breadcrumb={breadcrumb} />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <h5 className="card-title">All Questions</h5>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <div className="header mt-3">
                        <div className="search-bar">
                          <form
                            className="search-form align-items-center"
                            method="POST"
                            action="#"
                          >
                            <input
                              type="text"
                              name="query"
                              placeholder="Search"
                              title="Enter search keyword"
                              onChange={onSearchChange}
                              style={{ width: "80%" }}
                            />
                            <i
                              className="bi bi-search"
                              style={{ marginLeft: "-30px" }}
                            ></i>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <QuestionTable3 data={allQue} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AllQuestion;
