import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SubscriptionUpdate from '../../_components/SubscriptionUpdate';

export const metadata = {
  title: 'XoomCric Admin | Edit Subscription',
};

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { subscription_id } = params;

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return <SubscriptionUpdate session={session} id={subscription_id} />;
}
