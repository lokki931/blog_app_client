'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import { schemaComment } from '@/shema/shema';
import { createComment, fetchPostComments } from '@/features/сomments/commentSlice';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
const defaultTheme = createTheme();

export default function Comments({ id }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const me = useSelector((state) => state.users.me);
  const postComments = useSelector((state) => state.comments.postComments);

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
      setComments((prevArray) => [
        ...prevArray,
        {
          userId: me?.id,
          postId: id,
          text: values.text,
          author:{
            name: me?.name
          }
        },
      ]);
      resetForm();
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  useEffect(() => {
    dispatch(fetchPostComments(id));
  }, [id]);
  useEffect(() => {
    setComments(postComments);
  }, [postComments]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid>
        {comments?.length > 0 ? (
          comments?.map((el) => (
            <Card key={el.id} style={{ marginBottom: '16px' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {el.author?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {el.text}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card style={{ marginBottom: '16px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                No comments
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
      {me && (
        <Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '75%' }}>
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
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Comment
            </Button>
          </Box>
        </Grid>
      )}
    </ThemeProvider>
  );
}
