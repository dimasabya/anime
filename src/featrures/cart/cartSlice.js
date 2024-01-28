import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const idx = state.cartItems.findIndex((id) => id.mal_id == item.mal_id);
      console.log(idx);
      if (idx === -1) {
        state.cartItems.push({ ...item, total: 1 });
      } else {
        state.cartItems[idx];
        state.cartItems[idx].total += 1;
      }
      console.log(action.type);
      console.log(state.cartItems);
    },
    minToCart: (state, action) => {
      const item = action.payload;
      const idx = state.cartItems.findIndex((id) => id.mal_id === item.mal_id);
      if (idx !== -1) {
        if (state.cartItems[idx].total > 0) {
          state.cartItems[idx].total -= 1;
        } else {
          state.cartItems[idx].total = 0;
        }
      }
    },
    removeToCart: (state, action) => {
      const item = action.payload;
      const filter = state.cartItems.filter((itm) => itm.mal_id !== item.mal_id);
      state.cartItems = filter;
    },
  },
});

export const { addToCart, minToCart, removeToCart } = cartSlice.actions;

export default cartSlice;

export const itemsCart = (state) => state.cart.cartItems;
export const cartLength = (state) => state.cart.cartItems.reduce((total, item) => total + item.total, 0);
// export const cartLength = (state) => state.cart.cartItems.length;
