import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadCookies, removeCookies, saveCookies } from "../utils/Cookies";

const initialAuthState = {
  user: "",
  loading: false,
  error: "",
};

// export const GetCurrentUser = createAsyncThunk('getcurrentuser',async (_,{rejectWihValue})=> {
// 	try{
// 		let access_token = loadCookies('access_token');
// 		const headers = { 'Authorization': `Bearer ${access_token}` };
// 		const response = await axios.get(`/api/account/profile/`,{headers});
// 		return response.data.user
// 	}catch(error){
// 		return rejectWihValue(error)
// 	}
// })

// export const SignUpUser = createAsyncThunk('signupuser',async ({body,navigate},{rejectWihValue})=> {
// 	try{
// 		const response = await axios.post(`/api/account/register/`,body);
// 		navigate('/auth/login')
// 		return response
// 	}catch(error){
// 		return rejectWihValue(error.response)
// 	}
// })

export const getCurrentUser = async (dispatch) => {
  try {
    let access_token = loadCookies("access_token");
    const headers = { Authorization: `Bearer ${access_token}` };
    const response = await axios.get(`/api/account/profile/`, { headers });
    if (response.status === 200) {
      dispatch(GET_CURRENT_USER_SUCCESS(response.data.user));
    } else {
      dispatch(GET_CURRENT_USER_FAIL("Something went wrong!"));
    }
  } catch (error) {
    dispatch(GET_CURRENT_USER_FAIL("Something went wrong!"));
  }
};

export const signUpUser = async (dispatch, body, navigate) => {
  try {
    dispatch(SIGNUP_USER_BEGIN());
    const response = await axios.post(`/api/account/register/`, body);
    if (response.status == 201) {
      toast.success(response.data.msg);
      dispatch(SIGNUP_USER_SUCCESS());
      navigate("/auth/login");
    } else {
      toast.error("Server Error");
      dispatch(SIGNUP_USER_FAIL("Something went wrong!"));
    }
  } catch (error) {
    toast.error(error.response.data.email[0]);
    dispatch(SIGNUP_USER_FAIL("Something went wrong!"));
  }
};

export const loginUser = async (dispatch, body, navigate) => {
  try {
    dispatch(LOGIN_USER_BEGIN());
    const response = await axios.post(`/api/account/login/`, body);
    if (response.status == 200) {
      toast.success(response.data.msg);
      dispatch(LOGIN_USER_SUCCESS(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      saveCookies("access_token", response.data.token.access);
      navigate("/account/dashboard");
    } else {
      toast.error("Server Error");
      dispatch(LOGIN_USER_FAIL("Something went wrong!"));
    }
  } catch (error) {
    toast.error(error.response.data.errors.non_field_errors[0]);
    dispatch(LOGIN_USER_FAIL("Something went wrong!"));
  }
};

export const logoutUser = async (dispatch, navigate) => {
  try {
    dispatch(LOGOUT_USER_BEGIN());
    localStorage.removeItem("user", "");
    dispatch(LOGOUT_USER_SUCCESS());
    removeCookies("access_token");
    navigate("/auth/login");
  } catch (error) {
    toast.error(error.response.data.errors.non_field_errors[0]);
    dispatch(LOGOUT_USER_FAIL("Something went wrong!"));
  }
};

export const forgotPassword = async (dispatch, body, navigate) => {
  try {
    dispatch(FORGET_PASSWORD_BEGIN());
    const response = await axios.post(
      `/api/account/send-reset-password-email/`,
      body
    );
    if (response.status == 200) {
      toast.success(response.data.msg);
      dispatch(FORGET_PASSWORD_SUCCESS());
    } else {
      toast.error("Server Error");
      dispatch(FORGET_PASSWORD_FAIL());
    }
  } catch (error) {
    toast.error(error.response.data.errors.non_field_errors[0]);
    dispatch(FORGET_PASSWORD_FAIL());
  }
};

export const resetPassword = async (dispatch, body, uid, token, navigate) => {
  try {
    dispatch(RESET_PASSWORD_BEGIN());
    const response = await axios.post(
      `/api/account/reset-password/${uid}/${token}/`,
      body
    );
    if (response.status == 200) {
      toast.success(response.data.msg);
      dispatch(RESET_PASSWORD_SUCCESS());
    } else {
      toast.error("Server Error");
      dispatch(RESET_PASSWORD_FAIL());
    }
  } catch (error) {
    toast.error(error.response.data.errors.non_field_errors[0]);
    dispatch(RESET_PASSWORD_FAIL());
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    GET_CURRENT_USER_BEGIN: (state) => {
      state.loading = true;
    },
    GET_CURRENT_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    GET_CURRENT_USER_FAIL: (state) => {
      state.loading = false;
      state.user = null;
    },
    SIGNUP_USER_BEGIN: (state) => {
      state.loading = true;
      state.user = null;
    },
    SIGNUP_USER_SUCCESS: (state, action) => {
      state.loading = false;
    },
    SIGNUP_USER_FAIL: (state) => {
      state.loading = false;
      state.user = null;
    },
    LOGIN_USER_BEGIN: (state) => {
      state.loading = true;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    LOGIN_USER_FAIL: (state) => {
      state.loading = false;
      state.user = null;
    },
    LOGOUT_USER_BEGIN: (state) => {
      state.loading = true;
      state.user = null;
    },
    LOGOUT_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = null;
    },
    LOGOUT_USER_FAIL: (state) => {
      state.loading = false;
      state.user = null;
    },
    FORGET_PASSWORD_BEGIN: (state) => {
      state.loading = true;
      state.user = null;
    },
    FORGET_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = null;
    },
    FORGET_PASSWORD_FAIL: (state) => {
      state.loading = false;
      state.user = null;
    },
    RESET_PASSWORD_BEGIN: (state) => {
      state.loading = true;
      state.user = null;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = null;
    },
    RESET_PASSWORD_FAIL: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
  // extraReducers: {
  // 	[GetCurrentUser.pending] : (state) => {
  // 		state.loading = true;
  // 	},
  // 	[GetCurrentUser.fulfilled]: (state,{payload}) => {
  // 		state.loading = false;
  // 		state.user = payload;
  // 	},
  // 	[GetCurrentUser.rejected]: (state,{payload}) => {
  // 		state.loading = false;
  // 		state.error = payload
  // 	},
  // 	[SignUpUser.pending] : (state) => {
  // 		state.loading = true;
  // 	},
  // 	[SignUpUser.fulfilled]: (state,{payload}) => {
  // 		state.loading = false;
  // 		toast.success(payload.data.msg)
  // 		// state.user = payload;
  // 	},
  // 	[SignUpUser.rejected]: (state,{payload}) => {
  // 		state.loading = false;
  // 		// state.error = payload.response.data.email[0]
  // 		// toast.error(payload)
  // 	}
  // }
});

export const {
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAIL,
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  FORGET_PASSWORD_BEGIN,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_BEGIN,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} = authSlice.actions;

export default authSlice.reducer;
