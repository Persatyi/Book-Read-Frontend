import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    trainings: [],
  },
  reducers: {
    setTrainings(state, { payload }) {
      state.trainings = payload;
    },
  },
});

export const { setTrainings } = booksSlice.actions;

export const booksReducer = booksSlice.reducer;
