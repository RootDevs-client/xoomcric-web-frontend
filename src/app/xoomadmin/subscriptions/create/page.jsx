import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SubscriptionCreate from '../_components/SubscriptionCreate';

export const metadata = {
  title: 'XoomCric Admin | Add Subscription',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return <SubscriptionCreate session={session} />;
}
