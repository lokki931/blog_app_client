'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { schemaTag } from '@/shema/shema';
import { useRouter } from 'next/navigation';
import { createTag } from '@/features/tags/tagSlice';
const defaultTheme = createTheme();

export default function Posts() {
  const dispatch = useDispatch();
  const createdTag = useSelector((state) => state.tags.createdTag);
  const router = useRouter();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    isValidating: false,
    isSubmitting: true,
    validationSchema: schemaTag,
    onSubmit: async (values) => {
      const appForm = JSON.stringify({
        name: values.name,
      });
      // new FormData();
      // appForm.append('name', values.name);

      dispatch(createTag(appForm));
      router.push('/dashboard/tags');
      // console.log(createPost);
    },
  });
  const { errors, touched, values, handleChange, setFieldValue, handleSubmit } = formik;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid>
        <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
          <span>Create Tag</span>
        </Typography>
        <DashboardBreadcrumbs active={'Tags'} name={'Create Tag'} />
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
