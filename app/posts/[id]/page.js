'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Typography } from '@mui/material';
import { fetchByIdPost, fetchPostCategories, fetchPostTags } from '@/features/posts/postSlice';
import Image from 'next/image';
import { LikePost } from '@/app/_components/posts/LikePost';

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
        <Typography variant="body2" sx={{ mb: 1 }}>
          {cats?.length > 0 ? <span>Categories: </span> : ''}
          {cats?.map((cat, i, arr) => (
            <span key={cat.id}>
              {cat.name}
              {arr.length === i + 1 ? '' : ', '}
            </span>
          ))}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {tags?.length > 0 ? <span>Tags: </span> : ''}
          {tags?.map((tag, i, arr) => (
            <span key={tag.id}>
              #{tag.name}
              {arr.length === i + 1 ? '' : ', '}
            </span>
          ))}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {data?.content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Posts;
