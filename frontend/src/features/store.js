import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import productReducer from './productSlice.js';
import cartReducer from './cartSlice.js';
import uiReducer from './uiSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});
