import {useState} from 'react'
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
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';

import forgot_password_bg from '../../assets/images/forgot_password1.webp'
import loading_img from '../../assets/images/loading.jpg'
import Copyright from './Copyright';
import { forgotPassword } from '../../store/authSlice';

const ForgotPasswordSide = () => {
  const dispatch = useDispatch();
  const[isLoading,setIsLoading] = useState(false);

  const formSubmitHandler = async(event) =>{
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const enteredEmail = data.get('email').trim();
    if(enteredEmail.length > 0){
      await forgotPassword(dispatch,{email:enteredEmail});
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
            backgroundImage: `url(${forgot_password_bg})`,
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
              <MailLockOutlinedIcon sx={{fontSize:'40px'}}/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Typography component="h1" variant="h6">
              Mail Reset Password Link
            </Typography>
            <Box component="form" noValidate onSubmit={formSubmitHandler} sx={{ mt: 1,width : '100%'}}>
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
              {isLoading 
              ? 
                <img src={loading_img} style={{width:'100px'}} alt={loading_img}/>
              :
                <div style={{display:'flex',justifyContent:'left'}}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor:'#1a237e', color:'#fff', width:'30%', padding:'10px', "&:hover": {
                      backgroundColor: '#2962ff'} }}
                  >
                    Mail Link
                  </Button>
                </div>
              }
              <Grid container>
                <Grid item xs>
                  <Link href="/auth/forgot_password" variant="body2">
                    Forgot password?
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

export default ForgotPasswordSide
