'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import {
  fetchCategories,
  categoryDelete,
  fetchByIdCategory,
} from '@/features/categories/categorySlice';
import { fetchUserPosts } from '@/features/posts/postSlice';

import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import DataPopup from '@/app/_components/DataPopup';
import DataPostsPopup from '@/app/_components/DataPostsPopup';

export default function Categories() {
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedCatPosts, setSelectedCatPosts] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postsIsPopupOpen, setPostsIsPopupOpen] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const postsUser = useSelector((state) => state.posts.postsUser);

  const router = useRouter();

  const handleCatClick = (cat) => {
    setSelectedCat(cat);
    setIsPopupOpen(true);
    dispatch(fetchUserPosts());
  };

  const handleCatPostsClick = (cat) => {
    setSelectedCatPosts(cat);
    setPostsIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCat(null);
  };
  const closePostsPopup = () => {
    setPostsIsPopupOpen(false);
    setSelectedCatPosts(null);
  };

  const handleDelete = (id) => {
    dispatch(categoryDelete(id));
    dispatch(fetchCategories());
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchUserPosts());
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
          <Grid item xs={12} md={5}>
            Title
          </Grid>
          <Grid item xs={12} md={7}>
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
              <Grid item xs={12} md={5}>
                {cat.name}
              </Grid>
              <Grid item xs={12} md={7}>
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
                  variant="contained"
                  color="secondary"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    handleCatClick(cat);
                  }}>
                  select post
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    handleCatPostsClick(cat);
                  }}>
                  posts
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
      {isPopupOpen && selectedCat && (
        <DataPopup posts={postsUser?.posts} data={selectedCat} onClose={closePopup} />
      )}
      {postsIsPopupOpen && selectedCatPosts && (
        <DataPostsPopup elem={selectedCatPosts} onClosePosts={closePostsPopup} />
      )}
    </Grid>
  );
}
