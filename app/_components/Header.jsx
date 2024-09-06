'use client';
import { Button, Toolbar, Typography } from '@mui/material';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteCookiesHeader } from '../actions';
import { reset } from '@/features/users/userSlice';
import { fetchUser } from '@/features/users/userSlice';
import { useEffect } from 'react';

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const me = useSelector((state) => state.users.me);
  const handleClick = async () => {
    dispatch(reset());
    deleteCookiesHeader();
    router.push('/');
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Button size="small" href="/posts" LinkComponent={Link}>
        Posts
      </Button>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}>
        <Link href="/">Blog App</Link>
      </Typography>
      {!me ? (
        <>
          <Button variant="outlined" size="small" href="/register" LinkComponent={Link}>
            Sign up
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            size="small"
            href="/signin"
            LinkComponent={Link}>
            Sign in
          </Button>
        </>
      ) : (
        <>
          <Button variant="outlined" size="small" href="/dashboard" LinkComponent={Link}>
            {me?.name}
          </Button>
          <Button variant="outlined" sx={{ ml: 1 }} size="small" onClick={handleClick}>
            Logout
          </Button>
        </>
      )}
    </Toolbar>
  );
};
