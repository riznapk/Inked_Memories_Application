import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    updateInitialCartInfo(state, action) {
      state.cart = action.payload;
    },
    removeFromCart(state, action) {
      const newCart = [...state.cart];
      const index = state.cart.findIndex(
        (cartItem) => action.payload === cartItem.cartID
      );
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn("Cant remove the product from the cart");
      }
      return { ...state, cart: newCart };
    },
    clearCartInfo(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  updateInitialCartInfo,
  removeFromCart,
  clearCartInfo,
} = cartSlice.actions;
export default cartSlice.reducer;
