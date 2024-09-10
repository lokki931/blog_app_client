'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import {
  fetchByIdPost,
  fetchUserPosts,
  postDelete,
  postPublished,
} from '@/features/posts/postSlice';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Posts() {
  const dispatch = useDispatch();
  const postsUser = useSelector((state) => state.posts.postsUser);
  const router = useRouter();

  const handlePublished = (id) => {
    dispatch(postPublished(id));
    dispatch(fetchUserPosts());
  };
  const handleDelete = (id) => {
    dispatch(postDelete(id));
    dispatch(fetchUserPosts());
  };

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);

  return (
    <Grid>
      <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
        <span>Posts</span>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          href="/dashboard/posts/create"
          LinkComponent={Link}
          sx={{ mx: 1 }}>
          New
        </Button>
      </Typography>
      <DashboardBreadcrumbs name={'Posts'} />
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
        {postsUser?.posts
          .map((post, index) => (
            <Grid
              key={post.id}
              container
              sx={{
                mb: 2,
                pb: 2,
                borderBottom: '1px solid rgba(25, 118, 210, 0.5)',
                alignItems: 'center',
              }}
              spacing={1}>
              <Grid item xs={12} sm={10} md={7}>
                {post.title}
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                {!post.published ? (
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => handlePublished(post.id)}>
                    Published
                  </Button>
                ) : (
                  ''
                )}
                <Button
                  variant="contained"
                  color="success"
                  // href={`/dashboard/posts/${post.id}/update`}
                  // LinkComponent={Link}>
                  onClick={() => {
                    dispatch(fetchByIdPost(post.id));
                    router.push(`/dashboard/posts/${post.id}/update`);
                  }}>
                  update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ ml: 1 }}
                  onClick={() => handleDelete(post.id)}>
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
