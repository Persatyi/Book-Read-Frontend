import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   isModalOpen: false,
}

const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      toggleModal: (state) => {
         state.isModalOpen = !state.isModalOpen;
      },
   },
})
export const {
   toggleModal
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;