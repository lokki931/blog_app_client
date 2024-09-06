'use client';

import DashboardBreadcrumbs from '@/app/_components/DashboardBreadcrumbs';
import { Box, Grid } from '@mui/material';

export default function Tags() {
  return (
    <Grid>
      <DashboardBreadcrumbs name={'Tags'} />
      <Box sx={{ py: 3 }}>Tags</Box>
    </Grid>
  );
}
