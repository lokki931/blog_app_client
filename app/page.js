'use client';
import { fetchPosts } from '@/features/posts/postSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from './_components/posts/Post';
import { Grid } from '@mui/material';

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <Grid container sx={{ py: 4 }} spacing={4}>
          {posts?.map((el) => (
            <Post key={el.id} item={{ ...el }} />
          ))}
        </Grid>
      )}
    </>
  );
}
