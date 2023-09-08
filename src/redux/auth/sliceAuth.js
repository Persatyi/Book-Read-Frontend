import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4444/api";
axios.defaults.baseURL = "https://important-neckerchief-ant.cyclic.cloud/api";

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
      token.set(payload);
    },
    setIsAuth(state, { payload }) {
      state.isAuth = payload;
    },
  },
});

export const { loggedIn, loggedOff, resetTokens, setToken, setIsAuth } =
  sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
