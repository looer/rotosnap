import { useEffect } from 'react';
import '@/assets/main.css';
import '@/assets/chrome-bug.css';

import Layout from '@/components/Layout';
import { UserContextProvider } from '@/utils/useUser';

export default function MyApp({ Component, pageProps, ...appProps }) {
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  const getContent = () => {
    // Opt out of Layout for specific paths
    if (appProps.router.pathname.includes('/embed/'))
      return <Component {...pageProps} />;

    else if (appProps.router.pathname.includes('/dashboard'))
      return <Layout footer={false}><Component {...pageProps} /></Layout>;

    return (
      <Layout>
        <Component {...pageProps} />{" "}
      </Layout>
    );
  };

  return (
    <div className="bg-white">
      <UserContextProvider>
        {getContent()}
      </UserContextProvider>
    </div>
  );
}
