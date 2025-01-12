import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import FavoritesHome from './_component/FavoritesHome';

export const metadata = {
  title: 'XoomCric | Favorites',
};

export default async function Page() {
  return (
    <ThreeColumnLayout>
      <FavoritesHome />
    </ThreeColumnLayout>
  );
}
