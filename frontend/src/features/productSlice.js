import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '../services/productService.js';

export const fetchProducts = createAsyncThunk('products/list', async (params) => {
  const { data } = await productService.list(params);
  return data;
});

export const fetchProductDetails = createAsyncThunk('products/details', async (slug) => {
  const { data } = await productService.details(slug);
  return data.product;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [], selected: null, productCount: 0, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export default productSlice.reducer;
