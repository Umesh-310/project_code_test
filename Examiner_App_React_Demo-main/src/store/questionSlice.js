import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadCookies } from "../utils/Cookies";

const initialQuestionState = {
  allQuestion: [],
  myQuestion: [],
  error: "",
};

export const createQuestion = async (dispatch, body, navigate) => {
  console.log(body);
  try {
    dispatch(CREATE_QUESTION_BEGIN());
    let access_token = loadCookies("access_token");
    if (!access_token) {
      window.location.href = "/question/login";
    }
    const headers = { Authorization: `Bearer ${access_token}` };
    const response = await axios.post(`/api/author/create_question/`, body, {
      headers,
    });

    if (response.status == 201) {
      toast.success(response.data.msg);
      dispatch(CREATE_QUESTION_SUCCESS());
      navigate("/question/my_question/");
    } else {
      console.log(response);
      toast.error("Server Error");
      dispatch(CREATE_QUESTION_FAIL("Something went wrong!"));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.detail);
    dispatch(CREATE_QUESTION_FAIL("Something went wrong!"));
    // toast.error(error.response.data.errors.non_field_errors[0])
  }
};

export const getAllQuestion = async (dispatch, navigate, search) => {
  try {
    dispatch(GET_ALL_QUESTION_BEGIN());
    let access_token = loadCookies("access_token");
    if (!access_token) {
      navigate("/question/login");
    }
    const headers = { Authorization: `Bearer ${access_token}` };
    const response = await axios.get(
      `/api/author/questionlist/?search=${search}`,
      { headers },
    );
    if (response.status == 200) {
      console.log(response.data);
      dispatch(GET_ALL_QUESTION_SUCCESS(response.data));
    } else {
      console.log(response);
      toast.error("Server Error");
      dispatch(GET_ALL_QUESTION_FAIL("Something went wrong!"));
    }
  } catch (error) {
    console.log(error);
    dispatch(GET_ALL_QUESTION_FAIL("Something went wrong!"));
    // toast.error(error.response.data.errors.non_field_errors[0])
  }
};

export const GetMyQuestion = createAsyncThunk(
  "getmyquestion",
  async (search, { rejectWihValue }) => {
    try {
      let access_token = loadCookies("access_token");
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/author/questionlist_by_me/?search=${search}`,
        { headers },
      );
      return response.data;
    } catch (error) {
      return rejectWihValue(error);
    }
  },
);

// export const getMyQuestion = async(dispatch, navigate,search) =>{
// 	try{
// 		dispatch(GET_MY_QUESTION_BEGIN());
// 		let access_token = loadCookies('access_token')
// 		if(!access_token){
// 			navigate('/question/login')
// 		}
// 		const headers = { 'Authorization': `Bearer ${access_token}` };
// 		const response = await axios.get(`/api/author/questionlist_by_me/?search=${search}`,{headers});
// 		if(response.status == 200) {
// 			dispatch(GET_MY_QUESTION_SUCCESS(response.data));
// 		}
// 		else{
// 			toast.error('Server Error');
// 			dispatch(GET_MY_QUESTION_FAIL("Something went wrong!"));
// 		}
// 	}
// 	catch (error) {
// 	  dispatch(GET_MY_QUESTION_FAIL("Something went wrong!"));
// 	  // toast.error(error.response.data.errors.non_field_errors[0])
// 	}
// };

const questionSlice = createSlice({
  name: "question",
  initialState: initialQuestionState,
  reducers: {
    CREATE_QUESTION_BEGIN: (state) => {
      state.loading = true;
    },
    CREATE_QUESTION_SUCCESS: (state, action) => {
      state.loading = false;
    },
    CREATE_QUESTION_FAIL: (state) => {
      state.loading = false;
    },
    GET_ALL_QUESTION_BEGIN: (state) => {
      state.loading = true;
    },
    GET_ALL_QUESTION_SUCCESS: (state, action) => {
      state.loading = false;
      state.allQuestion = action.payload;
    },
    GET_ALL_QUESTION_FAIL: (state) => {
      state.loading = false;
    },
    GET_MY_QUESTION_BEGIN: (state) => {
      state.loading = true;
    },
    GET_MY_QUESTION_SUCCESS: (state, action) => {
      state.loading = false;
      state.myQuestion = action.payload;
    },
    GET_MY_QUESTION_FAIL: (state) => {
      state.loading = false;
    },
  },
  extraReducers: {
    [GetMyQuestion.pending]: (state) => {
      state.loading = true;
    },
    [GetMyQuestion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.myQuestion = payload;
    },
    [GetMyQuestion.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_FAIL,
  GET_ALL_QUESTION_BEGIN,
  GET_ALL_QUESTION_SUCCESS,
  GET_ALL_QUESTION_FAIL,
  GET_MY_QUESTION_BEGIN,
  GET_MY_QUESTION_SUCCESS,
  GET_MY_QUESTION_FAIL,
} = questionSlice.actions;

export default questionSlice.reducer;
