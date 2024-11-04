import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import Fixtures from './match/_components/Fixtures';

export const metadata = {
  title: 'XoomCric | Fixtures',
};

export default async function Page() {
  return (
    <ThreeColumnLayout>
      <Fixtures />
    </ThreeColumnLayout>
  );
}
