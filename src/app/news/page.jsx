import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import NewsHome from './_components/NewsHome';

export const metadata = {
  title: 'XoomCric | Cricket News',
  description:
    'Stay updated with the latest cricket news, expert opinions, and analysis. Explore articles covering matches, player updates, and significant events in the cricket world.',
  keywords:
    'cricket news, latest updates, match reports, player news, cricket analysis, XoomCric',
};

export default async function page() {
  return (
    <ThreeColumnLayout>
      <NewsHome />
    </ThreeColumnLayout>
  );
}
