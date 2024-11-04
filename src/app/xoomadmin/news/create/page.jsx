import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewsCreate from '../_components/NewsCreate';

export const metadata = {
  title: 'XoomCric Admin | Add News',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return <NewsCreate session={session} />;
}
