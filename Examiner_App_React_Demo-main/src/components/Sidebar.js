import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ toggle, closeDrawer }) => {
  let user = useSelector((state) => state.auth.user);

  return (
    <>
      <aside id="sidebar" className={`sidebar ${toggle && "togglebar"}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to="/account/dashboard" className="nav-link collapsed">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <hr />
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#questions-nav"
              data-bs-toggle="collapse"
              href="#questions-nav"
            >
              <i className="bi bi-question-square"></i>
              <span>Questions</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="questions-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/question/all_question">
                  <i className="bi bi-list-ul"></i>
                  <span>All Questions</span>
                </Link>
              </li>
              {user?.is_author && (
                <>
                  <li>
                    <Link to="/question/my_question">
                      <i className="bi bi-card-list"></i>
                      <span>My Questions</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/question/add_question">
                      <i className="bi bi-pencil-square"></i>
                      <span>Create New Question</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
          <>
            {user?.is_examiner && (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link collapsed"
                    data-bs-target="#exams-nav"
                    data-bs-toggle="collapse"
                    href="#exams-nav"
                  >
                    <i className="bi bi-question-square"></i>
                    <span>Exams</span>
                    <i className="bi bi-chevron-down ms-auto"></i>
                  </a>
                  <ul
                    id="exams-nav"
                    className="nav-content collapse"
                    data-bs-parent="#sidebar-nav"
                  >
                    <li>
                      <Link to="/exam/all_exam">
                        <i className="bi bi-card-list"></i>
                        <span>All Exams</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/exam/create_exam_option">
                        <i className="bi bi-pencil-square"></i>
                        <span>Create New Exam</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </>
          <hr />
          <li className="nav-item">
            <Link to="/account/profile" className="nav-link">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
