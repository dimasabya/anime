import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./featrures/book/bookSlice";
import toggleSlice from "./featrures/toggle/toggleSlice";
import searchForm from "./featrures/search/searchSlice";
import cartSlice from "./featrures/cart/cartSlice";

export default configureStore({
  reducer: {
    book: bookSlice.reducer,
    toggle: toggleSlice.reducer,
    search: searchForm.reducer,
    cart: cartSlice.reducer,
  },
});
