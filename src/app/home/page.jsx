import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import Fixtures from './match/_components/Fixtures';

export const metadata = {
  title: 'XoomCric | Match Information',
  description:
    'Stay updated with the latest fixtures, match results, trending news, and series point tables in cricket. Explore live scores and in-depth analyses.',
  keywords:
    'cricket fixtures, live scores, match results, trending news, series point table',

  author: 'XoomCric Team',
};

export default async function Home() {
  return (
    <ThreeColumnLayout>
      <Fixtures />
    </ThreeColumnLayout>
  );
}
