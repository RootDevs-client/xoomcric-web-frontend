import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import UsersUpdate from '../../_components/UsersUpdate';

export const metadata = {
  title: 'XoomCric Admin | Edit User',
};

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { user_id } = params;

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return <UsersUpdate session={session} id={user_id} />;
}
