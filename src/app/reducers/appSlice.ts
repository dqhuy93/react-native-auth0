import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AppState } from '../interfaces/app';

const initialState: AppState = {
  cart: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cart = action.payload;
    },
  },
});

export const { updateCart } = appSlice.actions;

export const selectCart = (state: RootState) => state.app.cart;

export default appSlice.reducer;
