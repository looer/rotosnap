import { useEffect } from 'react';
import '@/assets/main.css';
import '@/assets/chrome-bug.css';

import Layout from '@/components/Layout';
import { UserContextProvider } from '@/utils/useUser';
import router from 'next/router';
import * as ga from '../lib/ga';

export default function MyApp({ Component, pageProps, ...appProps }) {
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const getContent = () => {
    // Opt out of Layout for specific paths
    if (appProps.router.pathname.includes('/embed/') || appProps.router.pathname.includes('/project/'))
      return <Component {...pageProps} />;

    else if (appProps.router.pathname.includes('/dashboard') || appProps.router.pathname.includes('/project/'))
      return <Layout footer={false}><Component {...pageProps} /></Layout>;

    return (
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    );
  };

  return (
    <div className="bg-accents-9">
      <UserContextProvider>
        {getContent()}
      </UserContextProvider>
    </div>
  );
}
