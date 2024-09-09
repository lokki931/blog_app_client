import { getCookiesHeader } from '@/app/actions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(`${process.env.apiUrl}/posts`);
  const data = await response.json();
  return data;
});
export const fetchUserPosts = createAsyncThunk('postsUser/fetchUserPosts', async () => {
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
export const createUserPost = createAsyncThunk('createPost/createUserPost', async (dataForm) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`http://localhost:5001/api/v1/posts/create`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
    body: dataForm,
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
    createPost: null,
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
      })
      .addCase(createUserPost.fulfilled, (state, action) => {
        state.createPost = action.payload;
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
