'use client';

import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import MainLoader from '../Global/MainLoader';

export default function AuthBootstrap({ children }) {
  const { token, updateUser, logout } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) {
      setReady(true);
      return;
    }

    xoomBackendUrl
      .get('/api/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        if (data.status) updateUser(data.user);
        else logout();
      })
      .catch(logout)
      .finally(() => setReady(true));
  }, [token]);

  if (!ready) return <MainLoader />; // no loader, instant paint
  return children;
}
