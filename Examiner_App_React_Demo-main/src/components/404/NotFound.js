import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main>
        <div className="container">
          <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1>404</h1>
            <h2>The page you are looking for doesn't exist.</h2>
            <Link className="btn" to="/">
              Back to home
            </Link>
            <img
              src={process.env.PUBLIC_URL + "/assets/img/not-found.svg"}
              className="img-fluid py-5"
              alt="Page Not Found"
            />
            <div className="credits">
              Designed by <a href="/">Team Lanet</a>
            </div>
          </section>
        </div>
      </main>

      <a
        href={process.env.REACT_APP_BASE_URL}
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default NotFound;
