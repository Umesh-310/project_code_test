import { useCallback, useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import PageTitle from "./PageTitle";
import { loadCookies } from "../../../utils/Cookies";
import { GetMyQuestion } from "../../../store/questionSlice";
const QuestionTable3 = lazy(() => import("./QuestionTable3"));

const MyQuestion = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  let myQue = useSelector((state) => state.question.myQuestion);

  const onSearchChange = async (e) => {
    await getMyQue(e.target.value);
  };

  const getMyQue = useCallback(async (search = "") => {
    // await GetMyQuestion(dispatch, navigate,search)
    dispatch(GetMyQuestion(search));
  }, []);

  const deletionHandler = async (e, que) => {
    e.preventDefault();
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      let response;
      if (que.is_deleted) {
        response = await axios.put(
          `/api/author/restore_question/${que.id}/`,
          {},
          { headers },
        );
      } else {
        response = await axios.delete(
          `/api/author/delete_question/${que.id}/`,
          { headers },
        );
      }

      if (response.status === 200) {
        toast.success(response.data.msg);
        getMyQue();
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const onQuestionUpdateHandler = async (e, que) => {
    e.preventDefault();
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.patch(
        `/api/author/update_question/${que.id}/`,
        que,
        { headers },
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const onTestcaseUpdateHandler = async (e, testcase) => {
    e.preventDefault();
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      let response;
      response = await axios.patch(
        `/api/author/update_testcase/${testcase.id}/`,
        testcase,
        { headers },
      );

      if (response.status === 200) {
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const onSubmitHandler = async (
    e,
    que,
    testcase1,
    testcase2,
    testcase3,
    testcase4,
    testcase5,
  ) => {
    await onQuestionUpdateHandler(e, que);
    await onTestcaseUpdateHandler(e, testcase1);
    await onTestcaseUpdateHandler(e, testcase2);
    await onTestcaseUpdateHandler(e, testcase3);
    await onTestcaseUpdateHandler(e, testcase4);
    await onTestcaseUpdateHandler(e, testcase5);
    getMyQue();
  };

  useEffect(() => {
    getMyQue();
  }, []);

  return (
    <>
      <main id="main" className="main custom-main">
        <PageTitle />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <h5 className="card-title">My Questions</h5>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xs-12"></div>
                    <div className="col-md-4 col-sm-12 col-xs-12">
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
                  <Suspense fallback={<div>Loading</div>}>
                    <QuestionTable3
                      data={myQue}
                      deletionHandler={deletionHandler}
                      onQuestionUpdateHandler={onQuestionUpdateHandler}
                      onTestcaseUpdateHandler={onTestcaseUpdateHandler}
                      onSubmitHandler={onSubmitHandler}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MyQuestion;
