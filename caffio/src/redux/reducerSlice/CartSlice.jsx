import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push({ id: action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, change } = action.payload;
      const itemToUpdate = state.find((item) => item.id === itemId);
      if (itemToUpdate) {
        // Ensure the quantity doesn't go below 1
        itemToUpdate.quantity = Math.max(1, itemToUpdate.quantity + change);
      }
    },
    clearCart: (state) => {
      return [];
    },
  },
});
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
