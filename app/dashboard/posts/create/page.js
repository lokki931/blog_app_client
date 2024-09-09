'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { schemaCreatePost } from '@/shema/shema';
import { createUserPost } from '@/features/posts/postSlice';
import { useRouter } from 'next/navigation';
// import { MuiFileInput } from 'mui-file-input';
const defaultTheme = createTheme();

export default function Posts() {
  const dispatch = useDispatch();
  const createPost = useSelector((state) => state.posts.createPost);
  const router = useRouter();
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      postImg: null,
    },
    isValidating: false,
    isSubmitting: true,
    validationSchema: schemaCreatePost,
    onSubmit: async (values) => {
      const appForm = new FormData();
      appForm.append('title', values.title);
      appForm.append('content', values.content);
      appForm.append('postImg', values.postImg);
      // for (let value in values) {
      //   appForm.append(value, values[value]);
      // }

      dispatch(createUserPost(appForm));
      router.push('/dashboard/posts');
      // console.log(createPost);
    },
  });
  const { errors, touched, values, handleChange, setFieldValue, handleSubmit } = formik;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid>
        <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
          <span>Create Post</span>
        </Typography>
        <DashboardBreadcrumbs active={'Posts'} name={'Create Post'} />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '50%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Enter title"
            name="title"
            autoComplete="title"
            autoFocus
            value={values.title}
            onChange={handleChange}
          />
          {touched.title && errors.title && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.title}
            </Typography>
          )}
          <TextField
            multiline
            rows={10}
            label="Enter Content"
            margin="normal"
            required
            fullWidth
            id="content"
            name="content"
            autoComplete="content"
            value={values.content}
            onChange={handleChange}
          />
          {touched.content && errors.content && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.content}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="postImg"
            label="Image"
            type="file"
            id="postImg"
            onChange={(event) => {
              setFieldValue('postImg', event.currentTarget.files[0]);
            }}
          />
          {touched.postImg && errors.postImg && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.postImg}
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
