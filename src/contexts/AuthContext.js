'use client';

import MainLoader from '@/components/Global/MainLoader';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isLoginRestricted, isPrivet } from './routeMatcher';

export default function AuthContext({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const validatedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAdmin, updateUser, setLoading, logout } = useAuthStore();
  useEffect(() => {
    if (!token || validatedRef.current) {
      setIsLoading(false);
      return;
    }

    const validate = async () => {
      setLoading(true);
      try {
        const { data } = await xoomBackendUrl.get('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.status) {
          updateUser(data.user);
          validatedRef.current = true;
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    validate();
  }, [token]);

  useEffect(() => {
    if (token === undefined) {
      setIsLoading(false);
      return;
    }
    if (token && isLoginRestricted(pathname)) {
      router.replace('/');
    } else if (!token && isPrivet(pathname)) {
      router.replace('/phone-login');
      return;
    } else {
      router.replace(pathname);
      return;
    }
  }, [pathname, token, isAdmin]);
  if (isLoading) return <MainLoader />;

  return children;
}
