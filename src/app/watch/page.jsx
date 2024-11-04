import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import WatchHome from './_components/WatchHome';

export const metadata = {
  title: 'XoomCric | Highlights Watch',
  description:
    'Catch the best moments in cricket with our highlights watch. Enjoy curated video highlights of matches, key plays, and outstanding performances from recent games.',
  keywords:
    'cricket highlights, match highlights, video highlights, best moments, cricket performances, XoomCric',
};

export default async function Page() {
  return (
    <ThreeColumnLayout>
      <WatchHome />
    </ThreeColumnLayout>
  );
}
