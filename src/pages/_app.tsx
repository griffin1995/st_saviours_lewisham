import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@/contexts/ThemeContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="color-scheme" content="dark light" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}