import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await authService.login(payload);
  return data.user;
});

export const register = createAsyncThunk('auth/register', async (payload) => {
  const { data } = await authService.register(payload);
  return data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success('Logged in');
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        toast.error('Login failed');
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        toast.success('Registered');
      });
  },
});

export default authSlice.reducer;
