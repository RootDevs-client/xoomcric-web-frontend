'use client';

import { isLoginRestricted, isPrivet } from '@/contexts/routeMatcher';
import { useAuthStore } from '@/lib/auth-store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RouteGuard({ children }) {
  const { token } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (token && isLoginRestricted(pathname)) {
      router.replace('/');
      return;
    }

    if (!token && isPrivet(pathname)) {
      router.replace('/phone-login');
      return;
    }
  }, [pathname, token]);

  return children;
}
