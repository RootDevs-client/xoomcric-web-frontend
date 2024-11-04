import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import UsersHome from './_components/UsersHome';

export const metadata = {
  title: 'XoomCric Admin | Users',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return <UsersHome session={session} />;
}
