'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { postUserLike } from '@/features/posts/postSlice';

export const LikePost = ({ data, setData }) => {
  const dispatch = useDispatch();
  const me = useSelector((state) => state.users.me);
  const [myArray, setMyArray] = useState([]);
  const handleLike = (id) => {
    dispatch(postUserLike(id));

    setData((prevItems) => {
      return prevItems.id === id ? { ...prevItems, like: prevItems.like + 1 } : prevItems;
    });
    const isPostExists = myArray.some((item) => item.postId === id);
    if (!isPostExists) {
      setMyArray((prevArray) => [
        ...prevArray,
        {
          userId: me?.id,
          postId: id,
          liked: true,
        },
      ]);
    }
  };
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem('myArray'));
    setMyArray(storedArray || []);
  }, []);

  useEffect(() => {
    if (myArray && myArray.length > 0) {
      localStorage.setItem('myArray', JSON.stringify(myArray));
    }
  }, [myArray]);

  function showLikeBtn(array, id) {
    const likedPost = array.find((value) => me?.id === value.userId && value.postId === id);
    return likedPost ? likedPost.liked : false;
  }

  return (
    <Typography
      sx={{ display: 'flex', alignItems: 'center' }}
      variant="caption"
      color="text.secondary">
      <span>like: {data?.like}</span>
      {me && !showLikeBtn(myArray, data?.id) && (
        <ThumbUpIcon
          onClick={() => handleLike(data?.id)}
          sx={{
            '&:hover': {
              color: '#1976d2',
            },
            cursor: 'pointer',
            ml: 1,
            fontSize: '18px',
            marginTop: '-8px',
          }}
        />
      )}
    </Typography>
  );
};
