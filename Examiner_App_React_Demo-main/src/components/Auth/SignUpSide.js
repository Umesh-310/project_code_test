import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Toolbar,
} from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

import Copyright from "./Copyright";
import { signUpUser } from "../../store/authSlice";
import signup_bg from "../../assets/images/signup.webp";
import loading_img from "../../assets/images/loading.jpg";

const SignUpSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let loading = useSelector((state) => state.auth.loading);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enteredEmail = data.get("email").trim().toLowerCase();
    const enteredName = data.get("name").trim();
    const enteredPassword = data.get("password").trim();
    const enteredPassword2 = data.get("password2").trim();

    if (
      enteredEmail.length > 0 &&
      enteredName.length > 0 &&
      enteredPassword.length > 0 &&
      enteredPassword2.length > 0
    ) {
      if (enteredPassword === enteredPassword2) {
        await signUpUser(
          dispatch,
          {
            email: enteredEmail,
            name: enteredName,
            password: enteredPassword,
            password2: enteredPassword2,
          },
          navigate
        );
      } else {
        toast.error("Password and ReType Password Mismatch");
      }
    } else {
      toast.error("Pleas Enter All Details");
    }
  };

  return (
    <>
      <Toolbar />
      <Grid container component="main" sx={{ height: "91vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signup_bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: "secondary.main",
                width: "60px",
                height: "60px",
              }}
            >
              <LockOpenOutlinedIcon sx={{ fontSize: "40px" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formSubmitHandler}
              sx={{ mt: 1 }}
            >
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
              />
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="ReType Password"
                type="password"
                id="password2"
              />
              {loading ? (
                <img
                  src={loading_img}
                  style={{ width: "100px" }}
                  alt={loading_img}
                />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#0c1f4d",
                    color: "#fff",
                    width: "50%",
                    padding: "10px",
                    "&:hover": {
                      backgroundColor: "#2962ff",
                    },
                  }}
                >
                  Sign Up
                </Button>
              )}
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <NavLink
                    to="/auth/login"
                    style={{ textDecoration: "none", color: "#0c1f4d" }}
                  >
                    {"Do have an account? Login"}
                  </NavLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUpSide;
