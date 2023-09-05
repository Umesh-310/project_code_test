import { createSlice } from "@reduxjs/toolkit";

const initialAnswerState = {
  answer: {},
  curLanguage: "",
  copyDetect: 0,
  fullScreenLeave: 0,
  attendExamId: "",
  switchedTab: 0,
  switchedWindow: 0,
};

const answerSlice = createSlice({
  name: "answer",
  initialState: initialAnswerState,
  reducers: {
    SAVE_MY_CODE: (state, action) => {
      state.answer = { ...state.answer, ...action.payload };
    },
    SET_EXAM_ID: (state, action) => {
      state.attendExamId = action.payload;
    },
    SET_LANGUAGE: (state, action) => {
      state.curLanguage = action.payload;
    },
    COPY_DETECT: (state) => {
      state.copyDetect = state.copyDetect + 1;
    },
    FULL_SCREEN_LEAVE: (state) => {
      state.fullScreenLeave = state.fullScreenLeave + 1;
    },
    SWITCH_TAB: (state) => {
      state.switchedTab = state.switchedTab + 1;
    },
    SWITCH_WINDOW: (state) => {
      state.switchedWindow = state.switchedWindow + 1;
    },
    EMPTY_FULL_STATE: (state, action) => {
      state.answer = {};
      state.copyDetect = 0;
      state.curLanguage = "";
      state.fullScreenLeave = 0;
      state.switchedTab = 0;
      state.switchedWindow = 0;
    },
  },
});

export const {
  SAVE_MY_CODE,
  SET_LANGUAGE,
  SWITCH_WINDOW,
  SWITCH_TAB,
  EMPTY_FULL_STATE,
  COPY_DETECT,
  SET_EXAM_ID,
  FULL_SCREEN_LEAVE,
} = answerSlice.actions;

export default answerSlice.reducer;
