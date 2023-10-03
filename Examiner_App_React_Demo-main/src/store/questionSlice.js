import { toast } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadCookies } from "../utils/Cookies";

const initialQuestionState = {
  allPublicQuestion: [],
  allQuestion: [],
  myQuestion: [],
  error: "",
  loading: false,
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

    if (response.status === 201) {
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

export const GetAllPublicQuestion = createAsyncThunk(
  "getAllPublicQuestion",
  async (search, { rejectWihValue }) => {
    try {
      let access_token = loadCookies("access_token");
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/author/questionlist/${search ? "?search=" + search : ""}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWihValue(error);
    }
  }
);

export const GetAllQuestion = createAsyncThunk(
  "getAllQuestion",
  async (search, { rejectWihValue }) => {
    try {
      let access_token = loadCookies("access_token");
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/author/all_questionlist/${search ? "?search=" + search : ""}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWihValue(error);
    }
  }
);

export const GetMyQuestion = createAsyncThunk(
  "getmyquestion",
  async (search, { rejectWihValue }) => {
    try {
      let access_token = loadCookies("access_token");
      const headers = { Authorization: `Bearer ${access_token}` };
      const response = await axios.get(
        `/api/author/questionlist_by_me/${search ? "?search=" + search : ""}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      return rejectWihValue(error);
    }
  }
);

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
    [GetAllPublicQuestion.pending]: (state) => {
      state.loading = true;
    },
    [GetAllPublicQuestion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allPublicQuestion = payload;
    },
    [GetAllPublicQuestion.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [GetAllQuestion.pending]: (state) => {
      state.loading = true;
    },
    [GetAllQuestion.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allQuestion = payload;
    },
    [GetAllQuestion.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_FAIL,
  GET_MY_QUESTION_BEGIN,
  GET_MY_QUESTION_SUCCESS,
  GET_MY_QUESTION_FAIL,
} = questionSlice.actions;

export default questionSlice.reducer;
