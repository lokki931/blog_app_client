import { Grid } from '@mui/material';
import DashboardNav from '../_components/DashboardNav';

export const metadata = {
  title: 'Dashboard Blog App',
  description: 'Dashboard Blog app whith next,express, sqlite',
};

export default function DashboardLayout({ children }) {
  return (
    <Grid container spacing={3} sx={{ py: 4 }}>
      <Grid item xs={12} sm={2}>
        <DashboardNav />
      </Grid>
      <Grid item xs={12} sm={10}>
        {children}
      </Grid>
    </Grid>
  );
}
