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
  },
  reducers: {
    loggedIn(state, { payload }) {
      state.token = payload;
      state.isAuth = true;
      token.set(payload);
    },
    loggedOff(state) {
      state.isAuth = false;
      state.token = null;
      token.unset();
    },
    setToken(_, { payload }) {
      token.set(payload);
    },
  },
});

export const { loggedIn, loggedOff, setToken } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
