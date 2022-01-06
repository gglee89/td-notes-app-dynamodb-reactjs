import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error?: {
    message: string;
    status: number;
  };
  user?: any;
}

export const isLoggedIn = createAsyncThunk('auth/isLoggedIn', (endpoint: string, thunkAPI) => {
  console.log('in isLoggedIn');
  return fetch(endpoint)
    .then((response) => {
      console.log('thunkAPI', thunkAPI);
      return response.json();
    })
    .then((json) => json);
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
    [isLoggedIn.fulfilled.toString()]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [isLoggedIn.rejected.toString()]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
