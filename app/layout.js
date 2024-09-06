import './globals.css';
import { Header } from './_components/Header';
import { Providers } from './provider';
import { Container, Grid } from '@mui/material';

export const metadata = {
  title: 'Blog App',
  description: 'Blog app whith next,express, sqlite',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Container>
            <Header />
            {children}
          </Container>
        </body>
      </Providers>
    </html>
  );
}
