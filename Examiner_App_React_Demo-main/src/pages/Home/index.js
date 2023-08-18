import React from "react";
import { Footer, Header, Home } from "../../components";

const HomePage = () => {
  return (
    <>
      <Header />
      {/* <Home/>
      <Footer/> */}
      <>
        <div className="row custom-main" style={{ margin: "50px" }}>
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <div className="card m-3">
              <div className="card-body">
                <div className="card-body pt-3" style={{ textAlign: "center" }}>
                  <div className="row">
                    <h3 className="custom-form-label">CoderTest Home Page</h3>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <img
                        src={process.env.PUBLIC_URL + "/assets/img/home_bg.jpg"}
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
      </>
    </>
  );
};

export default HomePage;
