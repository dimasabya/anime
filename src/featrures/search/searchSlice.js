import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchItem: {
    q: "",
    type: "anime",
  },
};

export const searchForm = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchQuery: (state, action) => {
      (state.searchItem.q = action.payload.q), (state.searchItem.type = action.payload.type);
      console.log(state.searchItem);
    },
  },
});

export const { searchQuery } = searchForm.actions;

export default searchForm;

export const resultQuery = (state) => state.search.searchItem;
