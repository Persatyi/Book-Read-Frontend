import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://persatyi-book-read-backend.herokuapp.com/api";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const sessionSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    refreshToken: null,
  },
  reducers: {
    loggedIn(state, { payload }) {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.isAuth = true;
      // token.set(payload);
    },
    loggedOff(state) {
      state.isAuth = false;
      state.token = null;
      state.refreshToken = null;
      token.unset();
    },
    resetTokens(state, { payload }) {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
    },
    setToken(state, { payload }) {
      state.isAuth = true;
      token.set(payload);
    },
  },
});

export const { loggedIn, loggedOff, resetTokens, setToken } =
  sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
