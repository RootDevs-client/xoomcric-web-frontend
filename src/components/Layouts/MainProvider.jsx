'use client';

import AppContextProvider from '@/contexts/XoomAppContent';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainLayout from './MainLayout';

export default function MainProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NextTopLoader color="#fb0405" showSpinner={false} />
        <AppContextProvider>
          <MainLayout>{children}</MainLayout>
        </AppContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
