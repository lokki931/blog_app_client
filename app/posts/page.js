'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Pagination, TextField } from '@mui/material';

import { fetchPosts } from '@/features/posts/postSlice';

import { Post } from '../_components/posts/Post';

const Posts = () => {
  const [inputValue, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const keys = ['title', 'content'];

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;

    setValue(inputValue.toLowerCase());
  };
  const handleSeach = (data) => {
    return data.filter((item) => keys.some((key) => item[key].toLowerCase().includes(inputValue)));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = handleSeach(posts).slice(indexOfFirstPost, indexOfLastPost);
  const countPage = Math.ceil(handleSeach(posts).length / 8);
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
          <Grid container alignItems="center" sx={{ my: 3 }}>
            {/* <input type="text"  /> */}
            <Box sx={{ width: 1 / 3 }}>
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
            {currentPosts.length > 0 ? (
              currentPosts.map((el) => <Post key={el.id} item={{ ...el }} />)
            ) : (
              <p>Not found</p>
            )}
          </Grid>
          <Grid spacing={2} container justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
            <Pagination
              color="primary"
              count={countPage}
              page={currentPage}
              onChange={handleChangePage}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Posts;
