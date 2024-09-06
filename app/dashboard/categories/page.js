'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Grid } from '@mui/material';

export default function Categories() {
  return (
    <Grid>
      <DashboardBreadcrumbs name={'Categories'} />
      <Box sx={{ py: 3 }}>Categories</Box>
    </Grid>
  );
}
