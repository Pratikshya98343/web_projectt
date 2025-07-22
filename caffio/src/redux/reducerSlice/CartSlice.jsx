// src/redux/reducerSlice/CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [], // Array of { id, quantity }
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload; // comes as ID from Menu.js
      const existingItem = state.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ id: itemId, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action) => {
      const { itemId, change } = action.payload;
      const item = state.find((item) => item.id === itemId);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          return state.filter((item) => item.id !== itemId);
        }
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;