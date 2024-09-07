'use client';
import { Button, Box } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    id: 1,
    href: '/dashboard',
    name: 'Dashboard',
  },
  {
    id: 2,
    href: '/dashboard/posts',
    name: 'Posts',
  },
  {
    id: 3,
    href: '/dashboard/categories',
    name: 'Categories',
  },
  {
    id: 4,
    href: '/dashboard/tags',
    name: 'Tags',
  },
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Box key={link.id} sx={{ mb: 2 }}>
          <Button // MUI Button
            href={link.href}
            LinkComponent={Link} // NextJS Link
            variant={pathname == link.href ? 'contained' : 'outlined'}>
            {link.name}
          </Button>
        </Box>
      ))}
    </>
  );
}
