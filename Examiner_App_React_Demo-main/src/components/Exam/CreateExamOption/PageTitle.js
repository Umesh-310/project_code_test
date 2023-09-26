import { Link } from "react-router-dom";

// delete
const PageTitle = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Create New Exam</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/account/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/exam/all_exam">Exams</Link>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default PageTitle;
