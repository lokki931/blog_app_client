import './globals.css';
import { Header } from './_components/Header';
import { Providers } from './provider';
import { Container, Grid } from '@mui/material';
import Footer from './_components/Footer';

export const metadata = {
  title: 'Blog App',
  description: 'Blog app whith next,express, sqlite',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Grid sx={{ flex: '1' }}>{children}</Grid>
            <Footer />
          </Container>
        </body>
      </Providers>
    </html>
  );
}
