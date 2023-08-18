import { Link } from "react-router-dom";

const PageTitle = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Create New Exam with Selected Question</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/account/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/exam/all_exam">Exams</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/exam/create_exam_option">Create New Exam Options</Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to="/exam/create_exam_with_selected_question">
                Create New Exam with Selected Question
              </Link>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default PageTitle;
