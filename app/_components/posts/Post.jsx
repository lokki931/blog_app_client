'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { LikePost } from './LikePost';

export const Post = ({ item }) => {
  const router = useRouter();
  const [data, setData] = useState(item);

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
          <LikePost data={data} setData={setData} />
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
