'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Skeleton, Typography } from '@mui/material';

import { fetchCategories } from '@/features/categories/categorySlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Categories = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(null);
  const cats = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setCategories(cats?.categories);
  }, [cats?.categories]);

  return (
    <>
      <Typography sx={{ my: 2 }} gutterBottom variant="h5">
        Categories
      </Typography>
      <Grid container sx={{ py: 4 }} spacing={4}>
        {categories?.length > 0 ? (
          categories?.map((el) => (
            <Grid key={el.id} item xs={12} sm={6} md={3}>
              {el ? (
                <Image
                  width={300}
                  height={250}
                  layout="responsive"
                  alt={el?.name}
                  loader={() => el?.categoryImg}
                  src={el?.categoryImg}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/categories/${el?.id}`)}
                />
              ) : (
                <Skeleton variant="rectangular" width={300} height={300} />
              )}

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
                    onClick={() => router.push(`/categories/${el?.id}`)}>
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

export default Categories;
