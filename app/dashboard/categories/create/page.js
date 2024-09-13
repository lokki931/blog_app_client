'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { schemaCreateCategory } from '@/shema/shema';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/features/categories/categorySlice';
const defaultTheme = createTheme();

export default function Posts() {
  const dispatch = useDispatch();
  const createdCategory = useSelector((state) => state.categories.createdCategory);
  const router = useRouter();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
      categoryImg: null,
    },
    isValidating: false,
    isSubmitting: true,
    validationSchema: schemaCreateCategory,
    onSubmit: async (values) => {
      const appForm = new FormData();
      appForm.append('name', values.name);
      appForm.append('categoryImg', values.categoryImg);

      dispatch(createCategory(appForm));
      router.push('/dashboard/categories');
      // console.log(createPost);
    },
  });
  const { errors, touched, values, handleChange, setFieldValue, handleSubmit } = formik;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid>
        <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
          <span>Create Category</span>
        </Typography>
        <DashboardBreadcrumbs active={'Categories'} name={'Create Category'} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '50%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Enter title"
            name="name"
            autoComplete="name"
            autoFocus
            value={values.name}
            onChange={handleChange}
          />
          {touched.name && errors.name && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.name}
            </Typography>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="categoryImg"
            label="Image"
            type="file"
            id="categoryImg"
            onChange={(event) => {
              setFieldValue('categoryImg', event.currentTarget.files[0]);
            }}
          />
          {touched.categoryImg && errors.categoryImg && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.categoryImg}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
          {error ? (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {error}
            </Typography>
          ) : (
            ''
          )}
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
