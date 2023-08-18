import React from "react";
import { Link } from "react-router-dom";

import AdbIcon from "@mui/icons-material/Adb";

const AttendExamEnd = () => {
  return (
    <div className="row custom-main" style={{ margin: "50px" }}>
      <div className="col-lg-1"></div>
      <div className="col-lg-10">
        <div className="card">
          <div className="card-body">
            <div
              className="card-title"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <Link
                    to={process.env.REACT_APP_BASE_URL}
                    className="logo d-flex align-items-center"
                  >
                    {/* <img src="assets/img/logo.png" alt=""/> */}
                    <AdbIcon
                      sx={{
                        display: { xs: "none", md: "flex" },
                        mr: 1,
                        color: "#0c1f4d",
                      }}
                    />
                    <span className="d-none d-lg-block">CoderTest</span>
                  </Link>
                </div>
              </div>
              <div></div>
            </div>
            <div className="card-body pt-3" style={{ textAlign: "center" }}>
              <div className="row">
                <h3 className="custom-form-label">
                  Thank You for Attempt Exam
                </h3>
                <h4 className="custom-form-label">
                  Contact Your Examiner for Marks
                </h4>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/img/attend_exam_end_bg.jpg"
                    }
                    alt="..."
                    style={{ height: "500px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-1"></div>
    </div>
  );
};

export default AttendExamEnd;
