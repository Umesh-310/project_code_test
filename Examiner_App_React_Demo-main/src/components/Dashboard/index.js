import { useEffect, useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { loadCookies } from "../../utils/Cookies";
import AssessedCountCard from "./AssessedCountCard";
import QualifiedCountCard from "./QualifiedCountCard";
import ExamCountCard from "./ExamCountCard";
const AttendExamAttendeeTable3 = lazy(() =>
  import("./AttendExamAttendeeTable3"),
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getAttendExamDetail = async () => {
    try {
      let access_token = loadCookies("access_token");
      if (!access_token) {
        navigate("/auth/login");
      }
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/attendee/attendexamlist_of_all_exams_of_examiner/`,
        { headers },
      );
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        toast.error("Server Error");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAttendExamDetail();
  }, []);

  return (
    <main id="main" className="main custom-main">
      <section className="section">
        <div className="row">
          <h4>Dashboard</h4>
          <div className="row" style={{ textAlign: "center" }}>
            {data?.data?.length > 0 ? (
              <>
                <div className="col-md-3 col-sm-6">
                  <ExamCountCard data={data} />
                </div>
                <div className="col-md-3 col-sm-6">
                  <AssessedCountCard data={data} />
                </div>
                <div className="col-md-3 col-sm-6">
                  <QualifiedCountCard data={data} />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="row">
          <h4>Results</h4>
          <div className="row" style={{ textAlign: "center" }}>
            {data?.data?.length > 0 ? (
              <>
                <Suspense fallback={<div>Loading</div>}>
                  <AttendExamAttendeeTable3 data={data.data} />
                </Suspense>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
