'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch, useSelector } from 'react-redux';
import { postUserLike } from '@/features/posts/postSlice';

export const Post = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const me = useSelector((state) => state.users.me);
  const [data, setData] = useState(item);
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
    console.log('Retrieved from localStorage:', storedArray);
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
    <Grid item xs={12} sm={6} md={3}>
      {data ? (
        <Image
          width={300}
          height={250}
          layout="responsive"
          alt={data?.title}
          loader={() => data?.postImg}
          src={data?.postImg}
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push(`/posts/${data?.id}`)}
        />
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {data ? (
        <Box sx={{ pr: 2 }}>
          <Typography
            sx={{
              '&:hover': {
                color: '#1976d2',
              },
              cursor: 'pointer',
            }}
            gutterBottom
            variant="body2"
            onClick={() => router.push(`/posts/${data?.id}`)}>
            {data?.title}
          </Typography>
          <Typography sx={{display:"flex", alignItems:"center" }} variant="caption" color="text.secondary">
            <span>like: {data?.like}</span>
            {me &&
              !showLikeBtn(myArray, data?.id) &&
                <ThumbUpIcon
                  onClick={() => handleLike(data?.id)}
                  sx={{
                    '&:hover': {
                      color: '#1976d2',
                    },
                    cursor: 'pointer',
                    ml:1
                  }}
                />
              }
          </Typography>
        </Box>
      ) : (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      )}
    </Grid>
  );
};
