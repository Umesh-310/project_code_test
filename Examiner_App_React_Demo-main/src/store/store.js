import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import questionSlice from "./questionSlice";
import remainTimeSlice from "./remainTimeSlice";
import answerSlice from "./answerSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["question", "auth", "remainTime"], //
};

export const rootReducers = combineReducers({
  auth: authSlice,
  question: questionSlice,
  remainTime: remainTimeSlice,
  answer: answerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     question: questionSlice,
//     remainTime: remainTimeSlice,
//   },
// });
setupListeners(store.dispatch);
export default store;
