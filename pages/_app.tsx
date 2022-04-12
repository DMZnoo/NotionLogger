import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppContextProvider from '@components/context/AppContextProvider';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <link href="/fonts/TitilliumWeb-Regular.ttf" rel="preload" as="font" crossOrigin=""/>
      <link href="/fonts/Arcade.ttf" rel="preload" as="font" crossOrigin=""/>
    </Head>
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
    </>
  )
}

export default MyApp
