import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "write URL here";

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
    user: {
      name: "",
      emeil: ""
    },
    isAuth: false,
    token: null,
  },
  reducers: {
    loggedIn(state) {
      token.set(state.token);
      state.isAuth = true;
    },
    loggedOff(state) {
      state.isAuth = false;
      state.token = null;
      token.unset();
    },
    setToken(state, { payload }) {
      token.set(payload);
      state.token = payload;
    },
  },
  extraReducers: {
    
  }
});

export const { loggedIn, loggedOff, setToken } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
