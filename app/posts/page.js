'use client';
import { fetchPosts } from '@/features/posts/postSlice';
import { Box, Grid, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../_components/posts/Post';
import { useEffect } from 'react';
import { useState } from 'react';

const Posts = () => {
  const dispatch = useDispatch();
  const [inputValue, setValue] = useState('');
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const keys = ['title', 'content'];

  const handleChange = (event) => {
    const inputValue = event.target.value;

    setValue(inputValue.toLowerCase());
  };
  const handleSeach = (data) => {
    return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(inputValue)));
  };

  const handleKeyPress = (event) => {
    // if (event.key === "Enter") return handleSearch()
  };
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          <Grid container alignItems="center" justifyContent="center" sx={{ my: 3 }}>
            {/* <input type="text"  /> */}
            <Box sx={{ width: 1 / 4 }}>
              <TextField
                fullWidth
                id="filled-basic"
                // value={inputValue ?? ''}
                onChange={handleChange}
                label="Search"
                variant="standard"
              />
            </Box>
          </Grid>
          <Grid container sx={{ py: 4 }} spacing={4}>
            {handleSeach(posts).length > 0 ? (
              handleSeach(posts).map((el) => <Post key={el.id} item={{ ...el }} />)
            ) : (
              <p>Not found</p>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Posts;
