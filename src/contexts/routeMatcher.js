const privetRoutes = [
  '/',
  '/favorites',
  '/home',
  '/league',
  '/login',
  '/match',
  '/news',
  '/news',
  '/payment/canceled',
  '/payment/success',
  '/player',
  '/privacy-policy',
  '/profile',
  '/series',
  '/team',
  '/terms-of-service',
  '/watch',
  '/watch',
];
const loginRestricted = ['/phone-login', '/register'];

export const adminLoginRoute = '/xoomadmin/login';

export const isPrivet = (pathname) => {
  return privetRoutes.some((route) => pathname.startsWith(route));
};
export const isLoginRestricted = (pathname) => {
  return loginRestricted.some((route) => pathname.startsWith(route));
};

export const isAdminRoute = (pathname) => {
  return pathname.startsWith('/xoomadmin');
};
