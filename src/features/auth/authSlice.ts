import { createSlice, createAsyncThunk, type PayloadAction, type SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error?: any;
  user?: any;
}

export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', async (endpoint: string, thunkAPI: any) => {
  try {
    const response = await thunkAPI.extra.authService.isLoggedIn();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [isLoggedIn.pending.toString()]: (state: AuthState) => {
      state.loading = true;
    },
    [isLoggedIn.fulfilled.toString()]: (state: AuthState, action: PayloadAction) => {
      state.loading = false;
      state.user = action.payload;
    },
    [isLoggedIn.rejected.toString()]: (state: AuthState, action: PayloadAction) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
