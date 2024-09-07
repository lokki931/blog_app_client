'use client';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { schemaLogin } from '@/shema/shema';
import { useMounted } from '@/utils/useMounted';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';
import { setCookiesHeader } from '@/app/actions';
import { fetchUser } from '@/features/users/userSlice';

const defaultTheme = createTheme();

const signIn = () => {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const mounted = useMounted();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    isValidating: false,
    isSubmitting: true,
    validationSchema: schemaLogin,
    onSubmit: async (values) => {
      // Handle form submission (e.g., API call)
      const response = await fetch(`${process.env.apiUrl}/users/signin`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(values),
      });
      const res = await response.json();
      if (!response.ok) {
        setError(res.error);
      } else {
        setCookiesHeader(res.token);

        setTimeout(() => {
          dispatch(fetchUser());
          router.push('/dashboard');
        }, 1000);
      }
    },
  });

  // Deconstruct Formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  if (!mounted) return null;
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${process.env.siteUrl}/wallpaper.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ ml: 4, mr: 4 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <Typography variant="body2" sx={{ color: 'red' }}>
                {errors.email}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <Typography variant="body2" sx={{ color: 'red' }}>
                {errors.password}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            {error ? (
              <Typography variant="body2" sx={{ color: 'red' }}>
                {error}
              </Typography>
            ) : (
              ''
            )}
            <Button // MUI Button
              href="/register"
              LinkComponent={Link} // NextJS Link
            >
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default signIn;
