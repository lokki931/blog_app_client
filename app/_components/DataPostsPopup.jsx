'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsCategory } from '@/features/categories/categorySlice';

const DataPostsPopup = ({ elem, onClosePosts }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.categories.postsCat);

  useEffect(() => {
    dispatch(fetchPostsCategory(elem.id));
  }, [dispatch]);

  return (
    <Dialog open={Boolean(elem)} onClose={onClosePosts} maxWidth="sm" fullWidth>
      <DialogTitle>Posts by {elem.name}</DialogTitle>
      <DialogContent>
        {posts?.length > 0 ? (
          posts?.map((post) => <p key={post.id}>{post.title}</p>)
        ) : (
          <p>No posts</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClosePosts} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataPostsPopup;
