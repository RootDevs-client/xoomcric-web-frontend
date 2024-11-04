import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BreadCrumb from '@/components/Global/BreadCrumb';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import HighlightsHome from './_components/HighlightsHome';

export const metadata = {
  title: 'XoomCric Admin | Highlight',
};

export default async function page() {
  const breadMenu = {
    path1: 'Highlights',
    link1: '/xoomadmin/highlights',
  };

  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return (
    <div>
      <BreadCrumb breadMenu={breadMenu} />
      <HighlightsHome session={session} />
    </div>
  );
}
