'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';

export default function Posts() {
  return (
    <Grid>
      <Typography variant="h6" component="h6" sx={{ pb: 2 }}>
        <span>Posts</span>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          href="#"
          LinkComponent={Link}
          sx={{ mx: 1 }}>
          New
        </Button>
      </Typography>
      <DashboardBreadcrumbs name={'Posts'} />
      <Box sx={{ py: 3 }}>Posts</Box>
    </Grid>
  );
}
