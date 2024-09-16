'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { schemaTag } from '@/shema/shema';
import { useRouter, useParams } from 'next/navigation';
import { fetchByIdTag, updateTag } from '@/features/tags/tagSlice';
const defaultTheme = createTheme();

export default function Posts() {
  const dispatch = useDispatch();
  const tagById = useSelector((state) => state.tags.tagById);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [error, setError] = useState();
  useEffect(() => {
    dispatch(fetchByIdTag(id));
  }, []);
  const formik = useFormik({
    initialValues: {
      name: tagById?.name,
    },
    isValidating: false,
    isSubmitting: true,
    enableReinitialize: true,
    validationSchema: schemaTag,
    onSubmit: async (values) => {
      const appForm = JSON.stringify({
        name: values.name,
      });
      // new FormData();
      // appForm.append('name', values.name);

      // appForm.append('categoryImg', values.categoryImg);
      const dataUpdate = {
        id,
        appForm,
      };
      dispatch(updateTag(dataUpdate));
      router.push('/dashboard/tags');
      // console.log(createPost);
    },
  });
  const { errors, touched, values, handleChange, setFieldValue, handleSubmit } = formik;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid>
        <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
          <span>Update {id} Tag</span>
        </Typography>
        <DashboardBreadcrumbs active={'Tags'} name={'Update Tag'} />
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
