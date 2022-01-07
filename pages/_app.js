
import Navbar from '@components/Navbar';
import { AuthProvider, useAuth } from '@lib/authContext';
import '@styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {
  const router = useRouter();


  return <AuthProvider>
    {router.pathname !== '/auth' && <Navbar />}
    <Component {...pageProps} />
  </AuthProvider>
}

export default MyApp
