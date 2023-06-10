import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

export default function App(
  { Component, pageProps }: AppProps,
  { session }: SessionProviderProps
) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
