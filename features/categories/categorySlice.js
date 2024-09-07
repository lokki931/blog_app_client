import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching data
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch(`${process.env.apiUrl}/categories`);
  const data = await response.json();
  return data;
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'idle';
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
