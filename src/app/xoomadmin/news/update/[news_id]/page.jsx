import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewsUpdate from '../../_components/NewsUpdate';

export const metadata = {
  title: 'XoomCric Admin | Edit News',
};

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);
  const { news_id } = params;

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  return <NewsUpdate session={session} id={news_id} />;
}
