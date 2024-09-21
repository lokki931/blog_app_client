'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { schemaComment } from '@/shema/shema';
import { createComment } from '@/features/сomments/commentSlice';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
const defaultTheme = createTheme();

export default function Comments({ id }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    isValidating: false,
    isSubmitting: true,
    validationSchema: schemaComment,
    onSubmit: async (values, { resetForm }) => {
      const appForm = JSON.stringify({
        text: values.text,
        postId: parseInt(id),
      });
      dispatch(createComment(appForm));
      resetForm();
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '50%' }}>
          <TextField
            multiline
            rows={10}
            label="Enter Comment"
            margin="normal"
            required
            fullWidth
            id="text"
            name="text"
            autoComplete="text"
            value={values.text}
            onChange={handleChange}
          />
          {touched.text && errors.text && (
            <Typography variant="body2" sx={{ color: 'red' }}>
              {errors.text}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Comment
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
