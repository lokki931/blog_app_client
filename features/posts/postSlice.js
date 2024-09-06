import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(`${process.env.apiUrl}/posts`);
  const data = await response.json();
  return data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = 'idle';
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
