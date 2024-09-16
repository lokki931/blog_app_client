'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsCategory } from '@/features/categories/categorySlice';
import { fetchPostsTag } from '@/features/tags/tagSlice';

const DataPostsPopup = ({ elem, onClosePosts, isOnProp }) => {
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  const postsCat = useSelector((state) => state.categories.postsCat);
  const postsTag = useSelector((state) => state.tags.postsTag);

  useEffect(() => {
    if (!isOnProp) {
      dispatch(fetchPostsCategory(elem.id));
    } else {
      console.log(elem.id)
      dispatch(fetchPostsTag(elem.id));
    }
  }, [dispatch, isOnProp, elem.id]);
  
  useEffect(() => {
    if (!isOnProp) {
      setPosts(postsCat);
    } else {
      setPosts(postsTag);
    }
  }, [postsCat, postsTag, isOnProp]);

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
