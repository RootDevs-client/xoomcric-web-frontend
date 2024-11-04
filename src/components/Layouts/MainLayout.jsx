// // Working for both on devtool open page change and refresh

// import { addListener, launch } from 'devtools-detector';
// import { usePathname, useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import AdminLayout from './Admin/AdminLayout';
// import BlankLayout from './BlankLayout';
// import ClientLayout from './Client/ClientLayout';

// export default function MainLayout({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     height: typeof window !== 'undefined' ? window.innerHeight : 0,
//   });

//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Add event listener for window resize
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     window.addEventListener('resize', handleResize);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []); // Empty dependency array ensures the effect runs once on mount

//   useEffect(() => {
//     // 1. add listener
//     const handleDevToolsChange = (status) => {
//       // console.log('Is open', status);
//       // 2. show alert if DevTools are open
//       setIsOpen(status);

//       // Open debugger if DevTools are open
//       if (status) {
//         // This will trigger the debugger statement
//         // Make sure your browser's developer tools are open
//         // eslint-disable-next-line no-debugger
//         debugger;

//         // Optionally, you can redirect to the home page
//         router.replace('/home');

//         // Trigger debugger again after redirect
//         // eslint-disable-next-line no-debugger
//         debugger;
//       }
//     };

//     addListener(handleDevToolsChange);

//     // 3. launch detect
//     launch();

//     // Additional code for detecting DevTools using window outer width
//     let isDevToolsOpen = false;
//     const detectDevTools = setInterval(() => {
//       if (window.outerWidth - window.innerWidth > 160) {
//         // Developer tools may be open
//         isDevToolsOpen = true;
//       } else {
//         // Developer tools are likely closed
//         isDevToolsOpen = false;
//       }

//       if (isDevToolsOpen) {
//         console.log('Developer tools may be open.');
//       } else {
//         console.log('Developer tools are likely closed.');
//       }
//     }, 1000);

//     // Clean up the event listeners when the component unmounts
//     return () => {
//       // Remove the listener when the component unmounts
//       addListener(null);
//       clearInterval(detectDevTools);
//     };
//   }, [windowSize, isOpen, router]); // Run the effect when either windowSize or isOpen changes

//   // Redirect to the home page if the pathname is not '/home'
//   useEffect(() => {
//     if (pathname !== '/home' && isOpen) {
//       router.replace('/home');
//     }
//   }, [isOpen, pathname, router]);

//   if (pathname.includes('xoomadmin/login')) {
//     return <BlankLayout>{children}</BlankLayout>;
//   } else if (pathname.includes('xoomadmin')) {
//     return <AdminLayout>{children}</AdminLayout>;
//   } else if (pathname === '/home') {
//     return <BlankLayout>{children}</BlankLayout>;
//   } else {
//     return <ClientLayout>{children}</ClientLayout>;
//   }
// }

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
