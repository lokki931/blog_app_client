'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import {
  fetchCategories,
  categoryDelete,
  fetchByIdCategory,
} from '@/features/categories/categorySlice';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const router = useRouter();

  const handleDelete = (id) => {
    dispatch(categoryDelete(id));
    dispatch(fetchCategories());
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Grid>
      <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
        <span>Categories</span>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          href="/dashboard/categories/create"
          LinkComponent={Link}
          sx={{ mx: 1 }}>
          New
        </Button>
      </Typography>
      <DashboardBreadcrumbs name={'Categories'} />
      <Box sx={{ py: 3 }}>
        <Grid
          container
          sx={{
            mb: 2,
            borderBottom: '1px solid rgba(25, 118, 210, 0.5)',
            color: '#1976d2',
            textTransform: 'uppercase',
          }}
          spacing={1}>
          <Grid item xs={12} sm={10} md={7}>
            Title
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            Actions
          </Grid>
        </Grid>
        {categories?.categories
          .map((cat, index) => (
            <Grid
              key={cat.id}
              container
              sx={{
                mb: 2,
                pb: 2,
                borderBottom: '1px solid rgba(25, 118, 210, 0.5)',
                alignItems: 'center',
              }}
              spacing={1}>
              <Grid item xs={12} sm={10} md={7}>
                {cat.name}
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    dispatch(fetchByIdCategory(cat.id));
                    router.push(`/dashboard/categories/${cat.id}/update`);
                  }}>
                  update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => handleDelete(cat.id)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))
          .reverse()}
      </Box>
    </Grid>
  );
}
