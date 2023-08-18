import * as React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";

import user_image from "../../assets/images/user.png";

function HeaderResponsiveAppBar() {
  const user = useSelector((state) => state.auth.user);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Start Medium Device Left Header */}
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#0c1f4d",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="http://localhost:3001/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 900,
              color: "#0c1f4d",
              textDecoration: "none",
            }}
          >
            CoderTest
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          {/* End Medium Device Left Header */}

          {/* Start Small Device Left Header */}
          <AdbIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#0c1f4d",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 900,
              color: "#0c1f4d",
              textDecoration: "none",
            }}
          >
            CoderTest
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          {/* End Small Device Left Header */}

          {/* Start Right Header */}
          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <>
                <Tooltip title="Signup">
                  <Button
                    color="inherit"
                    onClick={handleOpenUserMenu}
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
                    {/* <LoginIcon color="inherit"/> */}
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
                    {/* <LoginIcon color="inherit"/> */}
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={user_image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="dashboard" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to="/account/dashboard"
                        style={{ textDecoration: "none", color: "#0c1f4d" }}
                      >
                        Dashboard
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to="/account/profile"
                        style={{ textDecoration: "none", color: "#0c1f4d" }}
                      >
                        Profile
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="change_password" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to="/account/change_password"
                        style={{ textDecoration: "none", color: "#0c1f4d" }}
                      >
                        Change Password
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        to="/auth/logout"
                        style={{ textDecoration: "none", color: "#0c1f4d" }}
                      >
                        Logout
                      </NavLink>
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
          {/* End Right Header */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderResponsiveAppBar;
