import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadCookies } from "../../../utils/Cookies";
import css from "./CreateExamOption.module.css";
import PageTitlesCreate from "../../../utils/PageTitlesCreate";

const breadcrumb = [
  { url: "/account/dashboard", title: "Home" },
  { url: "/exam/all_exam", title: "Exams" },
];
// delete
const CreateExamOption = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let access_token = loadCookies("access_token");
    if (!access_token) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <>
      <main id="main" className="main custom-main">
        <PageTitlesCreate title="Create New Exam" breadcrumb={breadcrumb} />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Create New Exam Options</h5>
                  <div className="row">
                    <div className="col-md-1 col-lg-1"></div>
                    <div className="col-md-4 col-lg-4">
                      <Link to="/exam/create_exam_with_selected_question">
                        <div className={css.customCard}>
                          <div className={css.imageBackGround}>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/img/selectOption.png"
                              }
                              className={css.cardImgTop}
                              alt="..."
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              Create Exam with Selected Questions
                            </h5>
                            <p className={css.cardText}>
                              You can select Questions for exam
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-2 col-lg-2"></div>
                    <div className="col-md-4 col-lg-4">
                      <Link to="/exam/create_exam_with_random_question">
                        <div className={css.customCard}>
                          <div className={css.imageBackGround}>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/img/randomOption1.png"
                              }
                              className={css.cardImgTop}
                              alt="..."
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">
                              Create Exam with Random Questions
                            </h5>
                            <p className={css.cardText}>
                              System will select questions randomly for exam
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateExamOption;
