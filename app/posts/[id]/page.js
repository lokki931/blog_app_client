'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { fetchByIdPost } from '@/features/posts/postSlice';
import Image from 'next/image';

const Posts = ({ params }) => {
  const dispatch = useDispatch();
  const postById = useSelector((state) => state.posts.postById);

  useEffect(() => {
    dispatch(fetchByIdPost(params.id));
  }, [dispatch]);

  return (
    <Grid container sx={{ my: 3 }} spacing={4}>
      <Grid item xs={12} sm={3} md={6}>
        <Image
          alt={postById?.title}
          loader={() => postById?.postImg}
          src={postById?.postImg}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Typography variant="h5" sx={{mb:1}}>{postById?.title}</Typography>
        <Typography variant="body2" sx={{mb:1}}>{postById?.content}</Typography>
      </Grid>
    </Grid>
  );
};

export default Posts;
