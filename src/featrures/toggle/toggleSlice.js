import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggles: null,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    addToggle: (state, action) => {
      state.toggles = action.payload;
    },
    removeTToggle: (state, action) => {
      state.toggles = action.payload;
    },
  },
});

export const { addToggle, removeTToggle } = toggleSlice.actions;

export default toggleSlice;

export const selectToggle = (state) => state.toggle.toggles;
