import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetch('http://localhost:3000/api/me');
  const data = await response.json();
  return data;
});

const initialState = {
  me: null,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.me = action.payload;
        state.status = 'idle';
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
