import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { loadCookies } from "../../../utils/Cookies";
import ExamCardTable from "./ExamCardTable";
import PageTitle from "./PageTitle";

const MyAllExam = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getMyAllExam = async () => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(`/api/examiner/examlist_by_me/`, {
        headers,
      });
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const onExamUpdateHandler = async (body) => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.put(
        `/api/examiner/update_exam/${body.id}/`,
        body,
        { headers },
      );

      if (response.status === 200) {
        toast.success(response.data.msg);
        getMyAllExam();
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  const deletionHandler = async (e, exam) => {
    e.preventDefault();
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      let response;
      if (window.confirm("Are You sure to delete this Exam?")) {
        if (exam.is_deleted) {
          response = await axios.put(
            `/api/examiner/restore_exam/${exam.id}/`,
            {},
            { headers },
          );
        } else {
          response = await axios.delete(
            `/api/examiner/delete_exam/${exam.id}/`,
            { headers },
          );
        }

        if (response.status === 200) {
          toast.success(response.data.msg);
          getMyAllExam();
        } else {
          toast.error("Server Error");
        }
      }
    } catch (error) {}
  };

  const actvationHandler = async (e, exam) => {
    e.preventDefault();
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      let response;
      if (exam.is_active) {
        response = await axios.put(
          `/api/examiner/deactivate_exam/${exam.id}/`,
          {},
          { headers },
        );
      } else {
        response = await axios.put(
          `/api/examiner/activate_exam/${exam.id}/`,
          {},
          { headers },
        );
      }

      if (response.status === 200) {
        toast.success(response.data.msg);
        getMyAllExam();
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getMyAllExam();
  }, []);

  return (
    <>
      <main id="main" className="main">
        <PageTitle />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <ExamCardTable
                data={data}
                onExamUpdateHandler={onExamUpdateHandler}
                deletionHandler={deletionHandler}
                actvationHandler={actvationHandler}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default MyAllExam;
