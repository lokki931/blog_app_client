import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await fetch(`${process.env.apiUrl}/tags`);
  const data = await response.json();
  return data;
});

export const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: null,
    status: 'idle',
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
      });
  },
});

export const {} = tagsSlice.actions;

export default tagsSlice.reducer;
