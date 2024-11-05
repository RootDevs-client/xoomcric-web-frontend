'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from './Admin/AdminLayout';
import BlankLayout from './BlankLayout';
import ClientLayout from './Client/ClientLayout';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  if (pathname.includes('xoomadmin/login')) {
    return <BlankLayout>{children}</BlankLayout>;
  } else if (pathname.includes('xoomadmin')) {
    return <AdminLayout>{children}</AdminLayout>;
  } else if (pathname === '/home') {
    return <BlankLayout>{children}</BlankLayout>;
  } else {
    return <ClientLayout>{children}</ClientLayout>;
  }
}
