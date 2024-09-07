import { getCookiesHeader } from '@/app/actions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(`${process.env.apiUrl}/posts`);
  const data = await response.json();
  return data;
});
export const fetchUserPosts = createAsyncThunk('postsUser/fetchUserPosts', async () => {
  // const response = await fetch(`${process.env.apiUrl}/posts`);
  // const data = await response.json();
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }
  const response = await fetch(`${process.env.apiUrl}/posts/user`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
    method: 'GET',
  });
  const data = await response.json();
  return data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    postsUser: null,
    status: 'idle',
    statusUser: 'idle',
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
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.statusUser = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.postsUser = action.payload;
        state.statusUser = 'idle';
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
