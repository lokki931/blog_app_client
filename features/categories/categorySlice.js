import { getCookiesHeader } from '@/app/actions';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const apiCategoryUrl = `${process.env.apiUrl}/categories`;

// Async thunk for fetching data
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await fetch(`${apiCategoryUrl}`);
  const data = await response.json();
  return data;
});
export const createCategory = createAsyncThunk('categories/createCategory', async (dataForm) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiCategoryUrl}/create`, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
    body: dataForm,
  });
  const data = await response.json();
  return data;
});

export const categoryDelete = createAsyncThunk('categories/categoryDelete', async (id) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }

  const response = await fetch(`${apiCategoryUrl}/${id}/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${token}`, // notice the Bearer before your token
    },
  });
  const data = await response.json();
  return data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (dataUpdate) => {
  const token = await getCookiesHeader();

  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${apiCategoryUrl}/${dataUpdate.id}/update`, {
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

export const fetchByIdCategory = createAsyncThunk('posts/fetchByIdCategory', async (id) => {
  const response = await fetch(`${apiCategoryUrl}/${id}/category`);
  const data = await response.json();
  return data;
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: null,
    createdCategory: null,
    removeCategory: null,
    updatedCategory: null,
    categoryById: null,
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
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.createdCategory = action.payload;
      })
      .addCase(categoryDelete.fulfilled, (state, action) => {
        state.removeCategory = action.payload;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updatedCategory = action.payload;
      })
      .addCase(fetchByIdCategory.fulfilled, (state, action) => {
        state.categoryById = action.payload;
      });
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
