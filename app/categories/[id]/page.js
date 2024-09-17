'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { fetchByIdCategory, fetchPostsCategory } from '@/features/categories/categorySlice';
import { Post } from '@/app/_components/posts/Post';

const Posts = ({ params }) => {
  const [posts, setPosts] = useState(null);
  const [category, setCategory] = useState(null);

  const dispatch = useDispatch();
  const categoryById = useSelector((state) => state.categories.categoryById);
  const postsCat = useSelector((state) => state.categories.postsCat);

  useEffect(() => {
    dispatch(fetchByIdCategory(params.id));
    dispatch(fetchPostsCategory(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    setCategory(categoryById);
    setPosts(postsCat);
  }, [categoryById, postsCat]);

  return (
    <>
      <Typography sx={{ my: 2 }} gutterBottom variant="h5">
        Category {category?.name}
      </Typography>
      <Grid container sx={{ my: 3 }} spacing={4}>
        {posts?.length > 0 ? (
          posts?.map((el) => <Post key={el.id} item={{ ...el }} />)
        ) : (
          <p>Not found</p>
        )}
      </Grid>
    </>
  );
};

export default Posts;
