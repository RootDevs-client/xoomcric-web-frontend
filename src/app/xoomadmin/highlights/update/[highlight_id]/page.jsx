import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import UpdateHighlight from '../../_components/UpdateHighlight';

export default async function page({ params }) {
  const { highlight_id } = params;
  const session = await getServerSession(authOptions);
  return <UpdateHighlight highlightId={highlight_id} session={session} />;
}
