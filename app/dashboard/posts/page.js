'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Grid } from '@mui/material';

export default function Posts() {
  return (
    <Grid>
      <DashboardBreadcrumbs name={'Posts'} />
      <Box sx={{ py: 3 }}>Posts</Box>
    </Grid>
  );
}
