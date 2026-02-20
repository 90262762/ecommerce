import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCartLocal: (state, action) => {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.product._id === product._id);
      if (existing) {
        existing.quantity = quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    removeFromCartLocal: (state, action) => {
      state.items = state.items.filter((item) => item.product._id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      const item = state.items.find((i) => i.product._id === action.payload.productId);
      if (item) item.quantity = action.payload.quantity;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCartLocal, removeFromCartLocal, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
