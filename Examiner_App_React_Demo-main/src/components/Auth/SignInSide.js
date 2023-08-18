import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Avatar, 
  Button, 
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Toolbar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { loginUser } from '../../store/authSlice';
import Copyright from './Copyright';
// import login from '../../assets/images/login.jpg'
import login from '../../assets/images/login_bg.jpg'
import loading_img from '../../assets/images/loading.jpg'




const SignInSide = () => {

  let loading = useSelector(state => state.auth.loading);
  const[isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = async(event) =>{
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const enteredEmail = data.get('email').trim();
    const enteredPassword = data.get('password').trim();

    if(enteredEmail.length > 0 && enteredPassword.length > 0){
      await loginUser(dispatch,{
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken : true
      },navigate);
    }
    else{
      toast.error("Pleas Enter All Details");
    }
    setIsLoading(false);
  }

  return (
    <>
      <Toolbar />
      <Grid container component="main" sx={{ height: '92vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${login})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main',width:'60px', height:'60px' }}>
              <LockOutlinedIcon  sx={{fontSize:'40px'}}/>
            </Avatar>
            <Typography component="h1" variant="h5">
              LogIn
            </Typography>
            <Box component="form" noValidate onSubmit={formSubmitHandler} sx={{ mt: 1 }}>
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {loading 
              ? 
              <img src={loading_img} style={{width:'100px'}} alt={loading_img}/>
              :
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,
                  backgroundColor:'#0c1f4d', 
                  color:'#fff' , width:'50%', 
                  padding:'10px', 
                  "&:hover": {
                  backgroundColor: '#2962ff'} 
                }}
              >
                LogIn
              </Button>
              }

              <Grid container>
                <Grid item xs>
                  <NavLink to='/auth/forgot_password' style={{textDecoration:'none', color:'#0c1f4d'}}>Forgot Password?</NavLink>
                </Grid>
                <Grid item>
                  <NavLink to='/auth/signup' style={{textDecoration:'none', color:'#0c1f4d'}}>
                    {"Don't have an account? Sign Up"}
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
}

export default SignInSide