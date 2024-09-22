import { getCookiesHeader } from '@/app/actions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiCommentUrl = `${process.env.apiUrl}/comments`;
// Async thunk for fetching data
export const createComment = createAsyncThunk('comments/createComment', async (dataForm) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiCommentUrl}/create`, {
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
export const fetchPostComments = createAsyncThunk('comments/fetchPostComments', async (id) => {
  const response = await fetch(`${apiCommentUrl}/${id}/comments`);
  const data = await response.json();
  return data;
});

const initialState = {
  commentCreate: null,
  postComments: null,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.commentCreate = action.payload;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.postComments = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;

export default commentSlice.reducer;
