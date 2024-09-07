'use client';

import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CategoryIcon from '@mui/icons-material/Category';
import StyleIcon from '@mui/icons-material/Style';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserPosts } from '@/features/posts/postSlice';
import { fetchCategories } from '@/features/categories/categorySlice';
import { fetchTags } from '@/features/tags/tagSlice';
const styles = {
  baseBoxStyle: {
    position: 'absolute',
    left: '50%',
    top: '-25px',
    transform: 'translateX(-50%)',
    color: '#fff',
    fontSize: '50px',
    borderRadius: '50%',
    border: ' 5px solid #fff',
    p: 1,
  },
  customBoxStylePost: {
    bgcolor: 'warning.light',
  },
  customBoxStyleCategory: {
    bgcolor: 'secondary.main',
  },
  customBoxStyleTag: {
    bgcolor: 'success.main',
  },
  baseBoxStyleMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bgcolor: 'primary.main',
    color: 'white',
    position: 'relative',
    p: 4,
  },
  baseButtomStyle: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
  },
};
const Dashboard = () => {
  const dispatch = useDispatch();
  const postsUser = useSelector((state) => state.posts.postsUser);
  const categories = useSelector((state) => state.categories.categories);
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    dispatch(fetchUserPosts());
    dispatch(fetchCategories());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h6" component="h6">
        Dashboard
      </Typography>
      <Grid container sx={{ py: 4 }} spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={[styles.baseBoxStyleMain, styles.customBoxStylePost]}>
            <DynamicFeedIcon sx={[styles.baseBoxStyle, styles.customBoxStylePost]} />
            <Typography variant="body1" component="h4" sx={{ my: 1 }}>
              Posts
            </Typography>
            <Typography variant="body1" component="h3" sx={{ my: 1 }}>
              {postsUser ? postsUser.count : 0}
            </Typography>
            <Button
              variant="contained"
              href="/dashboard/posts"
              LinkComponent={Link}
              sx={[styles.baseButtomStyle]}>
              More Detail
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={[styles.baseBoxStyleMain, styles.customBoxStyleCategory]}>
            <CategoryIcon sx={[styles.baseBoxStyle, styles.customBoxStyleCategory]} />
            <Typography variant="body2" component="h4" sx={{ my: 1 }}>
              Categories
            </Typography>
            <Typography variant="body1" component="h3" sx={{ my: 1 }}>
              {categories ? categories.count : 0}
            </Typography>
            <Button
              variant="contained"
              href="/dashboard/categories"
              LinkComponent={Link}
              sx={[styles.baseButtomStyle]}>
              More Detail
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={[styles.baseBoxStyleMain, styles.customBoxStyleTag]}>
            <StyleIcon sx={[styles.baseBoxStyle, styles.customBoxStyleTag]} />
            <Typography variant="body2" sx={{ my: 1 }}>
              Tags
            </Typography>
            <Typography variant="body1" sx={{ my: 1 }}>
              {tags ? tags.count : 0}
            </Typography>
            <Button
              variant="contained"
              href="/dashboard/tags"
              LinkComponent={Link}
              sx={[styles.baseButtomStyle]}>
              More Detail
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
