'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  NativeSelect,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createPostCategory } from '@/features/categories/categorySlice';

const DataPopup = ({ data, onClose, posts }) => {
  // const [comment, setComment] = useState('');
  const [selectedPost, setSelectedPost] = useState('');

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedPost(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to server or console.log)
    // const appForm = new FormData();
    const appForm = JSON.stringify({
      postId: selectedPost,
      categoryId: data.id,
    });
    // appForm.append('categoryId', data.id);
    // appForm.append('postId', selectedPost);
    dispatch(createPostCategory(appForm));
    setSelectedPost('');
    // console.log('Data ID:', data.id);
    // console.log('Post ID:', selectedPost);
    onClose();
  };

  return (
    <Dialog open={Boolean(data)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{data.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {posts?.length > 0 ? (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="select-post-label">Select a Post</InputLabel>
              <Select
                labelId="select-post-label"
                value={selectedPost}
                label="Select a Post"
                onChange={handleChange}>
                {posts.map((post) => (
                  <MenuItem key={post.id} value={post.id}>
                    {post.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <p>No posts</p>
          )}
          {/* <TextField
            label="Your Comment"
            variant="outlined"
            fullWidth
            margin="normal"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          /> */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataPopup;
