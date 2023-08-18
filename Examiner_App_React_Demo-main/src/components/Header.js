import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AdbIcon from "@mui/icons-material/Adb";
import { Button, Tooltip } from "@mui/material";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to={process.env.REACT_APP_BASE_URL}
            className="logo d-flex align-items-center"
          >
            {/* <img src="assets/img/logo.png" alt=""/> */}
            <AdbIcon
              sx={{
                display: { xs: "block", md: "flex" },
                mr: 1,
                color: "#0c1f4d",
              }}
            />
            <span className="d-block d-lg-block">CoderTest</span>
          </Link>
          {/* <i className="bi bi-list toggle-sidebar-btn"></i> */}
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <NavLink
              to="/candidate_guide"
              style={{ textDecoration: "none", color: "#0c1f4d" }}
            >
              Candidate Guide
            </NavLink>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <NavLink
              to="/examiner_guide"
              style={{ textDecoration: "none", color: "#0c1f4d" }}
            >
              Examiner Guide
            </NavLink>{" "}
            &nbsp;&nbsp;
            {user ? (
              <li className="nav-item dropdown pe-3">
                <a
                  className="nav-link nav-profile d-flex align-items-center pe-0"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  {user?.image ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${user?.image}`}
                      alt="Profile"
                      className="rounded-circle"
                    />
                  ) : (
                    <div
                      className="bg-info rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="avatar"
                        style={{
                          color: "white",
                          fontSize: "32px",
                          fontWeight: "bold",
                        }}
                      >
                        {user?.name?.slice(0, 1)}
                      </span>
                    </div>
                  )}
                  <span className="d-none d-md-block dropdown-toggle ps-2">
                    {user?.name}
                  </span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{user?.name}</h6>
                    <span>{user?.name}</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      to="/account/profile"
                      className="dropdown-item d-flex align-items-center"
                    >
                      <i className="bi bi-person"></i>
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item d-flex align-items-center"
                      to="/auth/logout"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>LogOut</span>
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <Tooltip title="Signup">
                  <Button
                    color="inherit"
                    sx={{
                      backgroundColor: "#9fa8da",
                      p: 1,
                      m: 0.5,
                      textDecoration: "none",
                    }}
                  >
                    <NavLink
                      to="/auth/signup"
                      style={{ textDecoration: "none", color: "#0c1f4d" }}
                    >
                      SignUp
                    </NavLink>
                  </Button>
                </Tooltip>
                <Tooltip title="Login">
                  <Button
                    color="inherit"
                    aria-label="login"
                    sx={{ backgroundColor: "#9fa8da", p: 1, m: 0.5 }}
                  >
                    <NavLink
                      to="/auth/login"
                      style={{ textDecoration: "none", color: "#0c1f4d" }}
                    >
                      Login
                    </NavLink>
                  </Button>
                </Tooltip>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
