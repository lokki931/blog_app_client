import { getCookiesHeader } from '@/app/actions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiTagUrl = `${process.env.apiUrl}/tags`;
const apiPostTagUrl = `${process.env.apiUrl}/post_tag`;

// Async thunk for fetching data
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await fetch(`${apiTagUrl}`);
  const data = await response.json();
  return data;
});

export const createTag = createAsyncThunk('tags/createTag', async (dataForm) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiTagUrl}/create`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
      'Content-Type': 'application/json',
    },
    body: dataForm,
  });
  const data = await response.json();
  return data;
});

export const tagDelete = createAsyncThunk('tags/tagDelete', async (id) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiTagUrl}/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data = await response.json();
  return data;
});

export const fetchByIdTag = createAsyncThunk('tags/fetchByIdTag', async (id) => {
  const response = await fetch(`${apiTagUrl}/${id}/tag`);
  const data = await response.json();
  return data;
});

export const updateTag = createAsyncThunk('tags/updateTag', async (dataUpdate) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${apiTagUrl}/${dataUpdate.id}/update`, {
      method: 'PUT',
      headers: {
        Authorization: `bearer ${token}`, // notice the Bearer before your token
        'Content-Type': 'application/json',
      },
      body: dataUpdate.appForm,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const createPostTag = createAsyncThunk('tags/createPostTag', async (dataForm) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }
  const response = await fetch(`${apiPostTagUrl}`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
      'Content-Type': 'application/json',
    },
    body: dataForm,
  });
  const data = await response.json();
  return data;
});

export const fetchPostsTag = createAsyncThunk('tags/fetchPostsTag', async (id) => {
  const response = await fetch(`${apiPostTagUrl}/${id}/posts`);
  const data = await response.json();
  return data;
});

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: null,
    status: 'idle',
    removeTag: null,
    createdTag: null,
    tagById: null,
    updatedTag: null,
    tagPost: null,
    postsTag: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
        state.status = 'idle';
      })
      .addCase(tagDelete.fulfilled, (state, action) => {
        state.removeTag = action.payload;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.createdTag = action.payload;
      })
      .addCase(fetchByIdTag.fulfilled, (state, action) => {
        state.tagById = action.payload;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.updatedTag = action.payload;
      })
      .addCase(createPostTag.fulfilled, (state, action) => {
        state.tagPost = action.payload;
      })
      .addCase(fetchPostsTag.fulfilled, (state, action) => {
        state.postsTag = action.payload;
      });
  },
});

export const {} = tagsSlice.actions;

export default tagsSlice.reducer;
