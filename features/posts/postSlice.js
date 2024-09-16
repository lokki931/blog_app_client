import { getCookiesHeader } from '@/app/actions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiPostUrl = `${process.env.apiUrl}/posts`;
const apiPostCategoryUrl = `${process.env.apiUrl}/post_category`;
const apiPostTagUrl = `${process.env.apiUrl}/post_tag`;

export const fetchPostCategories = createAsyncThunk('posts/fetchPostCategories', async (id) => {
  const response = await fetch(`${apiPostCategoryUrl}/${id}/cats`);
  const data = await response.json();
  return data;
});
export const fetchPostTags = createAsyncThunk('posts/fetchPostTags', async (id) => {
  const response = await fetch(`${apiPostTagUrl}/${id}/tags`);
  const data = await response.json();
  return data;
});
// Async thunk for fetching data
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(`${apiPostUrl}`);
  const data = await response.json();
  return data;
});
export const fetchByIdPost = createAsyncThunk('posts/fetchByIdPost', async (id) => {
  const response = await fetch(`${apiPostUrl}/${id}/post`);
  const data = await response.json();
  return data;
});

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async () => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }
  const response = await fetch(`${apiPostUrl}/user`, {
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
export const createUserPost = createAsyncThunk('posts/createUserPost', async (dataForm) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiPostUrl}/create`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
    body: dataForm,
  });
  const data = await response.json();
  return data;
});

export const updateUserPost = createAsyncThunk('posts/updateUserPost', async (dataUpdate) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${apiPostUrl}/${dataUpdate.id}/update`, {
      method: 'PUT',
      headers: {
        Authorization: `bearer ${token}`, // notice the Bearer before your token
      },
      body: dataUpdate.appForm,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const postPublished = createAsyncThunk('posts/postPublished', async (id) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiPostUrl}/${id}/published`, {
    method: 'PUT',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data = await response.json();
  return data;
});

export const postUserLike = createAsyncThunk('posts/postUserLike', async (id) => {
  const response = await fetch(`${apiPostUrl}/${id}/like`, {
    method: 'PUT',
  });
  const data = await response.json();
  return data;
});
export const postDelete = createAsyncThunk('posts/postDelete', async (id) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiPostUrl}/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
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
    updatePost: null,
    publishedPost: null,
    deletePost: null,
    postById: null,
    postLike: null,
    postCategories: null,
    postTags: null,
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
      })
      .addCase(updateUserPost.fulfilled, (state, action) => {
        state.updatePost = action.payload;
      })
      .addCase(postPublished.fulfilled, (state, action) => {
        state.publishedPost = action.payload;
      })
      .addCase(postDelete.fulfilled, (state, action) => {
        state.deletePost = action.payload;
      })
      .addCase(fetchByIdPost.fulfilled, (state, action) => {
        state.postById = action.payload;
      })
      .addCase(postUserLike.fulfilled, (state, action) => {
        state.postLike = action.payload;
      })
      .addCase(fetchPostCategories.fulfilled, (state, action) => {
        state.postCategories = action.payload;
      })
      .addCase(fetchPostTags.fulfilled, (state, action) => {
        state.postTags = action.payload;
      });
  },
});

export const {} = postsSlice.actions;

export default postsSlice.reducer;
