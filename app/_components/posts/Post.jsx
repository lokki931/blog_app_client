import { Box, Grid, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';

export const Post = ({ item }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      {item ? (
        <Image
          width={300}
          height={250}
          layout="responsive"
          alt={item.title}
          loader={() => item.postImg}
          src={item.postImg}
        />
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {item ? (
        <Box sx={{ pr: 2 }}>
          <Typography gutterBottom variant="body2">
            {item.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {item.like}
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
