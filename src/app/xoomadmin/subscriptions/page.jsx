import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SubscriptionHome from './_components/SubscriptionHome';

export const metadata = {
  title: 'XoomCric Admin | Subscription',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return <SubscriptionHome session={session} />;
}
