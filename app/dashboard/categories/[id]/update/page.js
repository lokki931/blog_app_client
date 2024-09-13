'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { schemaUpdateCategory } from '@/shema/shema';
import { fetchByIdCategory, updateCategory } from '@/features/categories/categorySlice';
import { useRouter, useParams } from 'next/navigation';
const defaultTheme = createTheme();

export default function Posts() {
  const dispatch = useDispatch();
  const categoryById = useSelector((state) => state.categories.categoryById);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [error, setError] = useState();
  useEffect(() => {
    dispatch(fetchByIdCategory(id));
  }, []);
  const formik = useFormik({
    initialValues: {
      name: categoryById?.name,
      categoryImg: null,
    },
    isValidating: false,
    isSubmitting: true,
    enableReinitialize: true,
    validationSchema: schemaUpdateCategory,
    onSubmit: async (values) => {
      const appForm = new FormData();
      appForm.append('name', values.name);

      appForm.append('categoryImg', values.categoryImg);
      const dataUpdate = {
        id,
        appForm,
      };
      dispatch(updateCategory(dataUpdate));
      router.push('/dashboard/categories');
      // console.log(createPost);
    },
  });
  const { errors, touched, values, handleChange, setFieldValue, handleSubmit } = formik;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid>
        <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
          <span>Update {id} Category</span>
        </Typography>
        <DashboardBreadcrumbs active={'Categories'} name={'Update Category'} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '50%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Enter title"
            name="name"
            autoComplete="title"
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
            Update
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
