import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AdbIcon from "@mui/icons-material/Adb";
import { Box, Button, Divider, Menu, MenuItem, Tooltip } from "@mui/material";
import css from "./header.module.css";
import { Fragment, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ showDrawerIcon, handleDrawer }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenu, setUserMenu] = useState(null);
  const open = Boolean(anchorEl);
  const openMenu = Boolean(userMenu);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenu = (event) => {
    setUserMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setUserMenu(null);
  };
  const ButtonCss = { backgroundColor: "#9fa8da", p: 1, m: 0.5 };
  const menuCss = {
    paddingTop: "0px",
    paddingBottom: "0px",
    minHeight: "30px",
  };
  const candidateGuide = (
    <NavLink to="/candidate_guide" className={css.navText}>
      Candidate Guide
    </NavLink>
  );
  const examinerGuide = (
    <NavLink to="/examiner_guide" className={css.navText}>
      Examiner Guide
    </NavLink>
  );

  const signUp = (
    <NavLink className={css.navText} to="/auth/signup">
      SignUp
    </NavLink>
  );
  const Login = (
    <NavLink className={css.navText} to="/auth/login">
      Login
    </NavLink>
  );
  return (
    <header id="header" className={css.header}>
      <div className={css.flex}>
        {showDrawerIcon && (
          <Box
            className={css.menuIcon}
            onClick={handleDrawer}
            sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}
          >
            <MenuIcon
              sx={{
                display: { xs: "block", md: "flex" },
                color: "#0c1f4d",
              }}
            />
          </Box>
        )}
        <Link to={process.env.REACT_APP_BASE_URL} className={css.logoWrap}>
          <AdbIcon
            sx={{
              display: { xs: "block", md: "flex" },
              mr: 1,
              color: "#0c1f4d",
            }}
          />
          <span className={css.logoText}>CoderTest</span>
        </Link>
      </div>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {!loading && (
          <ul className={css.MenuWrap}>
            {candidateGuide}
            {examinerGuide}
            {!user && (
              <>
                <Tooltip title="Signup">
                  <Button color="inherit" sx={ButtonCss}>
                    {signUp}
                  </Button>
                </Tooltip>
                <Tooltip title="Login">
                  <Button color="inherit" aria-label="login" sx={ButtonCss}>
                    {Login}
                  </Button>
                </Tooltip>
              </>
            )}
            {user && (
              <>
                <div
                  id="user-menu-btn"
                  aria-controls={openMenu ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  onClick={handleClickMenu}
                  className={css.userInfo}
                >
                  {user?.image ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${user?.image}`}
                      alt="Profile"
                    />
                  ) : (
                    <div className={css.userNameImg}>
                      <span className={css.userNameImfText}>
                        {user?.name?.slice(0, 1)}
                      </span>
                    </div>
                  )}
                  <span className={css.userName}>{user?.name}</span>
                </div>
                <Menu
                  id="user-menu "
                  anchorEl={userMenu}
                  open={openMenu}
                  onClose={handleCloseMenu}
                  MenuListProps={{
                    "aria-labelledby": "user-menu-btn",
                  }}
                  PaperProps={{
                    sx: {
                      minWidth: 200,
                    },
                  }}
                >
                  <MenuItem className={css.userDataWrap}>
                    <h6>{user?.name}</h6>
                    <span>{user?.name}</span>
                  </MenuItem>
                  <Divider sx={{ borderColor: "gray" }} />
                  <MenuItem onClick={handleCloseMenu}>
                    <Link
                      to="/account/profile"
                      className={css.navText}
                      style={{ display: "flex", gap: "5px" }}
                    >
                      <i className="bi bi-person"></i>
                      <span>My Profile</span>
                    </Link>
                  </MenuItem>
                  <Divider sx={{ borderColor: "gray" }} />
                  <NavLink
                    className={css.navText}
                    to="/auth/logout"
                    style={{ display: "flex", gap: "5px" }}
                  >
                    <MenuItem onClick={handleCloseMenu}>
                      <i className="bi bi-box-arrow-right"></i>
                      <span>LogOut</span>
                    </MenuItem>
                  </NavLink>
                </Menu>
              </>
            )}
          </ul>
        )}
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <ul className={css.MenuWrap}>
          {user ? (
            <div
              id="default-menu-btn"
              aria-controls={open ? "default-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className={css.userInfo}
            >
              {user?.image ? (
                <img
                  src={`${process.env.REACT_APP_API_URL}${user?.image}`}
                  alt="Profile"
                />
              ) : (
                <div className={css.userNameImg}>
                  <span className={css.userNameImfText}>
                    {user?.name?.slice(0, 1)}
                  </span>
                </div>
              )}
              <span className={css.userName}>{user?.name}</span>
            </div>
          ) : (
            <Button
              id="default-menu-btn"
              aria-controls={open ? "default-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ padding: "8px 2px" }}
            >
              <MenuIcon
                sx={{
                  display: { xs: "block", md: "flex" },
                  color: "#0c1f4d",
                }}
              />
            </Button>
          )}
          <Menu
            id="default-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "default-menu-btn",
            }}
            PaperProps={{
              sx: {
                minWidth: 180,
                padding: "0px",
              },
            }}
          >
            {user ? (
              <>
                <MenuItem className={css.userDataWrap}>
                  <h6>{user?.name}</h6>
                  <span>{user?.name}</span>
                </MenuItem>
                <Divider
                  sx={{
                    borderColor: "gray",
                  }}
                />
                {[candidateGuide, examinerGuide].map((val, i) => {
                  return (
                    <Fragment key={i}>
                      <MenuItem sx={menuCss} onClick={handleClose}>
                        {val}
                      </MenuItem>
                      <Divider
                        sx={{
                          borderColor: "gray",
                        }}
                      />
                    </Fragment>
                  );
                })}
                <MenuItem sx={menuCss} onClick={handleClose}>
                  <Link
                    to="/account/profile"
                    className={css.navText}
                    style={{ display: "flex", gap: "5px" }}
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </Link>
                </MenuItem>
                <Divider sx={{ borderColor: "gray", p: 0 }} />

                <NavLink
                  className={css.navText}
                  to="/auth/logout"
                  style={{ display: "flex", gap: "5px" }}
                >
                  <MenuItem sx={menuCss} onClick={handleClose}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>LogOut</span>
                  </MenuItem>
                </NavLink>
              </>
            ) : (
              [candidateGuide, examinerGuide, signUp, Login].map((val, i) => {
                return (
                  <MenuItem key={i} onClick={handleClose}>
                    {val}
                  </MenuItem>
                );
              })
            )}
          </Menu>
        </ul>
      </Box>
    </header>
  );
};

export default Header;
