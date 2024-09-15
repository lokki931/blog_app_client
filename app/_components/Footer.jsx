'use client';

import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}App blog {new Date().getFullYear()}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
