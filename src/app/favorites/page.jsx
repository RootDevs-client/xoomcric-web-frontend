import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import FavoritesHome from './_component/FavoritesHome';

export const metadata = {
  title: 'XoomCric | Favorites',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <ThreeColumnLayout>
      <FavoritesHome session={session} />
    </ThreeColumnLayout>
  );
}
