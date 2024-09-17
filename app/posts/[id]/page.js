'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { fetchByIdPost, fetchPostCategories, fetchPostTags } from '@/features/posts/postSlice';
import Image from 'next/image';
import { LikePost } from '@/app/_components/posts/LikePost';
import PostInclude from '@/app/_components/posts/PostInclude';

const Posts = ({ params }) => {
  const [data, setData] = useState(null);
  const [cats, setCats] = useState(null);
  const [tags, setTags] = useState(null);
  const dispatch = useDispatch();
  const postById = useSelector((state) => state.posts.postById);
  const postCategories = useSelector((state) => state.posts.postCategories);
  const postTags = useSelector((state) => state.posts.postTags);

  useEffect(() => {
    dispatch(fetchByIdPost(params.id));
    dispatch(fetchPostCategories(params.id));
    dispatch(fetchPostTags(params.id));
  }, [dispatch]);

  useEffect(() => {
    setData(postById || null);
    setCats(postCategories || null);
    setTags(postTags || null);
  }, [postById, postCategories, postTags]);

  return (
    <Grid container sx={{ my: 3 }} spacing={4}>
      <Grid item xs={12} md={6}>
        <Image
          alt={data?.title}
          loader={() => data?.postImg}
          src={data?.postImg}
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {data?.title}
        </Typography>
        <LikePost setData={setData} data={data} />
        <PostInclude items={cats} title={'Categories'} isTagLink={false} />
        <PostInclude items={tags} title={'Tags'} isTagLink={true} />
        <Typography variant="body2" sx={{ mb: 1 }}>
          {data?.content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Posts;
