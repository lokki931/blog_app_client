'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchTags } from '@/features/tags/tagSlice';

const Tags = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tags, setTags] = useState(null);
  const tagsStore = useSelector((state) => state.tags.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    setTags(tagsStore?.tags);
  }, [tagsStore?.tags]);

  return (
    <>
      <Typography sx={{ my: 2 }} gutterBottom variant="h5">
        Tags
      </Typography>
      <Grid container sx={{ py: 4 }} spacing={4}>
        {tags?.length > 0 ? (
          tags?.map((el) => (
            <Grid key={el.id} item xs={12}>
              {el ? (
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
                    onClick={() => router.push(`/tags/${el?.id}`)}>
                    {el?.name}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              )}
            </Grid>
          ))
        ) : (
          <p>Not found</p>
        )}
      </Grid>
    </>
  );
};

export default Tags;
