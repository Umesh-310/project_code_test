import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loadCookies } from "../utils/Cookies";
import { RecordRTCPromisesHandler } from "recordrtc";

const initialRemainTimeState = {
  isTimeLimit: false,
  remainTime: {
    mili_seconds: 0,
    seconds: 0,
    hours: 0,
    minutes: 0,
  },
  loading: false,
  // for copy paste
  pasteCount: 0,

  // for reacording screen
  recorder: null,
  stream: null,
  videoBlob: null,
};

export const increasePasteCount = async (dispatch, pasteCount) => {
  dispatch(INCREASE_PASTE_COUNT_SUCCESS(pasteCount));
};

export const startRecording = async (dispatch) => {
  /* 
  const tabs = await browser.tabs.queryTabs({
  active: true,
});

const tabId = tabs[0].id;

const gdmOptions = {
  video: {
    displaySurface: "tab",
    tabId: tabId,
  },
};
  */
  const gdmOptions = {
    video: {
      displaySurface: "application",
    },
    // preferCurrentTab: true,
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
      suppressLocalAudioPlayback: true,
    },
    surfaceSwitching: "include",
    selfBrowserSurface: "include",
    systemAudio: "exclude",
  };
  const mediaDevices = navigator.mediaDevices;
  const stream = await mediaDevices.getDisplayMedia(gdmOptions);
  const recorder = new RecordRTCPromisesHandler(stream, { type: "video" });
  await recorder.startRecording();
  dispatch(
    START_RECORDING_SUCCESS({
      recorder: null, // recorder,
      stream: stream,
      videoBlob: null,
    })
  );
};

export const stopRecording = async (dispatch, recorder, stream) => {
  if (recorder) {
    await recorder.stopRecording();
    const blob = await recorder.getBlob();
    stream.stop();
    dispatch(STOP_RECORDING_SUCCESS({ videoBlob: blob }));
  } else {
    alert("No recording found");
  }
};

export const getRemainTime = async (
  dispatch,
  navigate,
  data,
  exam,
  recorder,
  stream,
  pasteCount
) => {
  const startTime = new Date(data?.start_time).getTime();
  const maxEndTime = new Date(
    startTime +
      exam?.time_limit_hour * 60 * 60 * 1000 +
      exam?.time_limit_minute * 60 * 1000
  ).getTime();
  const currentTime = new Date();
  if (
    maxEndTime - currentTime <= 120000 &&
    maxEndTime - currentTime >= 110000
  ) {
    alert("Please Submit ASAP \nExam will end in 2 minutes...");
  }
  if (maxEndTime - currentTime <= 0) {
    await endAttendExam(
      dispatch,
      navigate,
      data?.id,
      recorder,
      stream,
      pasteCount,
      "Time Exceeded"
    );
  }

  const tempHours = Math.floor((maxEndTime - currentTime) / 3600000);
  const tempMinutes =
    Math.floor((maxEndTime - currentTime) / 60000) - tempHours * 60;
  const tempSeconds =
    Math.floor((maxEndTime - currentTime) / 1000) - tempMinutes * 60;
  const tempMiliSeconds = maxEndTime - currentTime;
  const tempRemainTime = {
    mili_seconds: tempMiliSeconds,
    seconds: tempSeconds,
    minutes: tempMinutes,
    hours: tempHours,
  };
  dispatch(GET_REMAIN_TIME_SUCCESS(tempRemainTime));
};

export const endAttendExam = async (
  dispatch,
  navigate,
  attendExamId,
  recorder,
  stream,
  pasteCount,
  status = "Submitted"
) => {
  try {
    dispatch(END_ATTEND_EXAM_BEGIN());
    let access_token = loadCookies("access_token");
    if (!access_token) {
      toast.error("No Active User");
      window.location.href = `${process.env.REACT_APP_BASE_URL}/attend_exam/check_start_exam/${attendExamId}`;
    }
    const headers = { Authorization: `Bearer ${access_token}` };
    let response;
    if (recorder) {
      let form_data = new FormData();
      await recorder.stopRecording();
      const videoBlob = await recorder.getBlob();
      stream.stop();
      if (videoBlob) {
        const mp4File = new File([videoBlob], `${attendExamId}.mp4`, {
          type: "video/mp4",
        });
        console.log("MP4FILE : ", mp4File);

        form_data.append("video", mp4File, mp4File.name);
        form_data.append("total_cheat", pasteCount);
        form_data.append("status", status);
      }
      response = await axios.patch(
        `/api/attendee/end_attend_exam/${attendExamId}/`,
        form_data,
        { headers }
      );
    } else {
      const body = {
        total_cheat: pasteCount,
        status: status,
      };
      response = await axios.patch(
        `/api/attendee/end_attend_exam/${attendExamId}/`,
        body,
        { headers }
      );
    }

    if (response.status === 200) {
      toast.success(response.data.extra);
      dispatch(END_ATTEND_EXAM_SUCCESS());
      navigate(`/attend/attend_exam_end/${attendExamId}`, { replace: true });
    } else {
      toast.error("Server Error");
      dispatch(END_ATTEND_EXAM_FAIL());
    }
  } catch (error) {
    dispatch(END_ATTEND_EXAM_FAIL());
  }
};

const remainTimeSlice = createSlice({
  name: "remainTime",
  initialState: initialRemainTimeState,
  reducers: {
    INCREASE_PASTE_COUNT_SUCCESS: (state, action) => {
      state.pasteCount = action.payload + 1;
    },
    START_RECORDING_SUCCESS: (state, action) => {
      state.loading = false;
      state.recorder = action.payload.recorder;
      state.stream = action.payload.stream;
      state.videoBlob = action.payload.videoBlob;
    },
    STOP_RECORDING_SUCCESS: (state, action) => {
      state.loading = false;
      state.videoBlob = action.payload.videoBlob;
    },
    GET_REMAIN_TIME_BEGIN: (state) => {
      state.loading = true;
    },
    GET_REMAIN_TIME_SUCCESS: (state, action) => {
      state.loading = false;
      state.remainTime = action.payload;
    },
    GET_REMAIN_TIME_FAIL: (state) => {
      state.loading = false;
    },
    END_ATTEND_EXAM_BEGIN: (state) => {
      state.loading = true;
    },
    END_ATTEND_EXAM_SUCCESS: (state) => {
      state.loading = false;
    },
    END_ATTEND_EXAM_FAIL: (state) => {
      state.loading = true;
    },
  },
});

export const {
  INCREASE_PASTE_COUNT_SUCCESS,
  START_RECORDING_SUCCESS,
  STOP_RECORDING_SUCCESS,
  GET_REMAIN_TIME_BEGIN,
  GET_REMAIN_TIME_SUCCESS,
  GET_REMAIN_TIME_FAIL,
  END_ATTEND_EXAM_BEGIN,
  END_ATTEND_EXAM_SUCCESS,
  END_ATTEND_EXAM_FAIL,
} = remainTimeSlice.actions;

export default remainTimeSlice.reducer;
