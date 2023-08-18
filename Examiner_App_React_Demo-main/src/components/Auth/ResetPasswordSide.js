import {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import {
  Avatar, 
  Button, 
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Toolbar
} from '@mui/material';

import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';


import Copyright from './Copyright';
import reset_password_bg from '../../assets/images/reset_password.avif'
import loading_img from '../../assets/images/loading.jpg'
import { resetPassword } from '../../store/authSlice';

const ResetPasswordSide = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {uid,token} = params;
  const [isLoading,setIsLoading] = useState(false);

  const formSubmitHandler = async(event) =>{
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);

    const enteredPassword = data.get('password').trim();
    const enteredPassword2 = data.get('password2').trim();

    if(enteredPassword.length > 0 && enteredPassword2.length > 0){
      if(enteredPassword === enteredPassword2){
        await resetPassword(dispatch,
          {
            password : enteredPassword,
            password2 : enteredPassword2,
          },
          uid, token, 
          );
          navigate('/auth/login');
      }
      else{
        toast.error('Password and ReType Password Not Matched');
      }
    }
    else{
      toast.error("Pleas Enter All Details");
    }
    setIsLoading(false);
  }

  return (
    <>
      <Toolbar/>
      <Grid container component="main" sx={{ height: '92vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${reset_password_bg})`,
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
              <LockResetOutlinedIcon sx={{fontSize:'40px'}}/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={formSubmitHandler} sx={{ mt: 1,width : '100%'}}>
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                autoFocus
              />
              <TextField
                color="secondary"
                margin="normal"
                required
                fullWidth
                id="password2"
                label="ReType Password"
                name="password2"
                type="password"
                autoComplete="password"
              />

              {isLoading 
              ? 
                <img src={loading_img} style={{width:'100px'}} alt={loading_img}/>
              :
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:'#0c1f4d', color:'#fff', width:'50%', padding:'10px', "&:hover": {
                  backgroundColor: '#2962ff'} }}
              >
                Reset Password
              </Button>
              }
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/forgot_password" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/auth/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ResetPasswordSide
