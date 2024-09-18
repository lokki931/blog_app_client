'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { Post } from '@/app/_components/posts/Post';
import { fetchByIdTag, fetchPostsTag } from '@/features/tags/tagSlice';

const Posts = ({ params }) => {
  const [posts, setPosts] = useState(null);
  const [tag, setTag] = useState(null);

  const dispatch = useDispatch();
  const tagById = useSelector((state) => state.tags.tagById);
  const postsTag = useSelector((state) => state.tags.postsTag);

  useEffect(() => {
    dispatch(fetchByIdTag(params.id));
    dispatch(fetchPostsTag(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    setTag(tagById);
    setPosts(postsTag);
  }, [tagById, postsTag]);

  return (
    <>
      <Typography sx={{ my: 2 }} gutterBottom variant="h5">
        Tag {tag?.name}
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
