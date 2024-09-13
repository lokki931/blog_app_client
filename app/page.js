'use client';
import { fetchPosts } from '@/features/posts/postSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from './_components/posts/Post';
import { Grid, Paper, Button, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Link from 'next/link';

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
        <>
          <Carousel>
            {posts?.slice(0, 3).map((post, i) => (
              <Paper
                key={post.id}
                sx={{
                  backgroundImage: `url(${post.postImg})`,
                  backgroundSize: 'cover',
                  height: 400,
                  backgroundPosition: 'center',
                }}>
                <Grid sx={{ bgcolor: 'text.disabled', p: 2, color: '#fff' }}>
                  <Typography variant="h6" component="h6" sx={{ mt: 1, pt: 1 }}>
                    {post.title}
                  </Typography>
                  <p>
                    {post.content.length > 100
                      ? post.content.substring(0, 97) + '...'
                      : post.content}
                  </p>

                  <Button
                    className="CheckButton"
                    href={`/posts/${post.id}`}
                    LinkComponent={Link}
                    variant="contained"
                    sx={{ mt: 2 }}>
                    Check it out!
                  </Button>
                </Grid>
              </Paper>
            ))}
          </Carousel>
          <Grid container sx={{ py: 4 }} spacing={4}>
            {posts?.slice(0, 8).map((el) => (
              <Post key={el.id} item={{ ...el }} />
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
