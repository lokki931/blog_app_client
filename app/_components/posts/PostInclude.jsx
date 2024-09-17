import { Box, Typography } from '@mui/material';
import Link from 'next/link';

function PostInclude({ items, title, isTagLink }) {
  function setLink(id) {
    if (!isTagLink) {
      return `/categories/${id}`;
    } else {
      return `/tags/${id}`;
    }
  }

  return (
    <Typography variant="body2" sx={{ mb: 1 }}>
      {items?.length > 0 ? <span>{title}: </span> : ''}
      {items?.map((item, i, arr) => (
        <span key={item.id}>
          <Link href={setLink(item.id)}>
            <Box
              component="span"
              sx={{
                '&:hover': {
                  color: '#1976d2',
                },
                cursor: 'pointer',
              }}>
              {item.name}
            </Box>
          </Link>
          {arr.length === i + 1 ? '' : ', '}
        </span>
      ))}
    </Typography>
  );
}

export default PostInclude;
