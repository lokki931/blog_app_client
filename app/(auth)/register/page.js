'use client';
import { schemaRegister } from '@/shema/shema';
import { useMounted } from '@/utils/useMounted';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const defaultTheme = createTheme();

export default function registerPage() {
  const [error, setError] = useState();
  const router = useRouter();
  const mounted = useMounted();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    isValidating: false,
    isSubmitting: true,
    validationSchema: schemaRegister,
    onSubmit: async (values) => {
      // Handle form submission (e.g., API call)
      const response = await fetch(`${process.env.apiUrl}/users/register`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(values),
      });
      const res = await response.json();
      if (!response.ok) {
        setError(res);
      } else {
        router.push('/signin');
      }
    },
  });

  // Deconstruct Formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
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
            backgroundImage: `url(${process.env.siteUrl}/wallpaper-reg.jpg)`,
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
              my: 3,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
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
              Sign Up
            </Button>
            {error ? (
              <Typography variant="body2" sx={{ color: 'red' }}>
                {error}
              </Typography>
            ) : (
              ''
            )}
            <Button // MUI Button
              href="/signin"
              LinkComponent={Link} // NextJS Link
            >
              Have an account? Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
