import { Link } from "react-router-dom";

const PageTitle = ({ examId }) => {
  return (
    <>
      <div className="pagetitle">
        <h1>Exam Detail</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/account/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/exam/all_exam">Exams</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to={`/exam/exam_detail/${examId}`}>Exam Detail</Link>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default PageTitle;
