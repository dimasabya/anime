import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookItems: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    addToBook: (state, action) => {
      const newIem = action.payload;
      const existItem = state.bookItems.findIndex((item) => item.mal_id === newIem.mal_id);

      if (existItem !== -1) {
        state.bookItems[existItem];
      } else {
        state.bookItems.push(newIem);
      }
    },
    removeItemBook: (state, action) => {
      const items = action.payload;
      console.log(items);
      const filterAnime = state.bookItems.filter((itm) => itm.mal_id !== items.mal_id);
      state.bookItems = filterAnime;
    },
  },
});

export const { addToBook, removeItemBook } = bookSlice.actions;

export default bookSlice;

export const selectBookItems = (state) => state.book.bookItems;
export const selectTotalItems = (state) => state.book.bookItems.length;
