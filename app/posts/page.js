'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, Grid, MenuItem, Pagination, Select, TextField } from '@mui/material';

import { fetchPosts } from '@/features/posts/postSlice';

import { Post } from '../_components/posts/Post';
import { fetchCategories, fetchPostsCategory } from '@/features/categories/categorySlice';

const getCategories = (cats) => {
  return [{ id: 0, name: 'All' }, ...new Set(cats)];
};

const Posts = () => {
  const [inputValue, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [posts, setPosts] = useState(null);
  const postsPerPage = 8;
  const dispatch = useDispatch();
  const postsAll = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const catsLoad = useSelector((state) => state.categories.categories);
  const postsCat = useSelector((state) => state.categories.postsCat);
  const categories = getCategories(catsLoad?.categories);

  const keys = ['title', 'content'];

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;

    setValue(inputValue.toLowerCase());
  };
  const handleSeach = posts?.filter((item) =>
    keys.some((key) => item[key].toLowerCase().includes(inputValue)),
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = handleSeach?.slice(indexOfFirstPost, indexOfLastPost);
  const countPage = Math.ceil(handleSeach?.length / 8);

  const handleKeyPress = (event) => {
    // if (event.key === "Enter") return handleSearch()
  };
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCategories());
  }, [dispatch]);
  
  useEffect(() => {
    if (selectedCategory === 0) {
      setPosts(postsAll);
    } else {
      dispatch(fetchPostsCategory(selectedCategory));
      setPosts(postsCat);
    }
  }, [selectedCategory, dispatch, postsAll, postsCat]);

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
            <Box sx={{ width: 1 / 3, ml: 1 }}>
              <FormControl variant="filled" size="small">
                <Select
                  value={selectedCategory}
                  label="Categories"
                  onChange={(e) => {
                    setSelectedCategory(parseInt(e.target.value));
                    setCurrentPage(1); // Reset to first page on category change
                  }}>
                  {categories?.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(parseInt(e.target.value));
                  setCurrentPage(1); // Reset to first page on category change
                }}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select> */}
              </FormControl>
            </Box>
          </Grid>
          <Grid container sx={{ py: 4 }} spacing={4}>
            {currentPosts?.length > 0 ? (
              currentPosts?.map((el) => <Post key={el.id} item={{ ...el }} />)
            ) : (
              <p>Not found</p>
            )}
          </Grid>
          {countPage > 1 && (
            <Grid spacing={2} container justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
              <Pagination
                color="primary"
                count={countPage}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default Posts;
