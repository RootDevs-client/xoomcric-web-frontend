'use client';

import AppContextProvider from '@/contexts/XoomAppContent';
import NextTopLoader from 'nextjs-toploader';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthBootstrap from './AuthBootstrap';
import MainLayout from './MainLayout';
import RouteGuard from './RouteGuard';

export default function MainProvider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthContext> */}
      <AuthBootstrap>
        <RouteGuard>
          <NextTopLoader color="#fb0405" showSpinner={false} />
          <AppContextProvider>
            <MainLayout>{children}</MainLayout>
          </AppContextProvider>
        </RouteGuard>
      </AuthBootstrap>
      {/* </AuthContext> */}
    </QueryClientProvider>
  );
}
