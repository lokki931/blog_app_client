'use client';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { Chip } from '@mui/material';
import Link from 'next/link';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});
const DashboardBreadcrumbs = ({ name }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <StyledBreadcrumb
        component={Link}
        href="/dashboard"
        label="Dashboard"
        icon={<HomeIcon fontSize="small" />}
        clickable
      />
      <StyledBreadcrumb label={name} />
    </Breadcrumbs>
  );
};

export default DashboardBreadcrumbs;
