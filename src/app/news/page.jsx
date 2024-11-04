import ThreeColumnLayout from '@/components/Layouts/Client/ThreeColumnLayout';
import NewsHome from './_components/NewsHome';

export const metadata = {
  title: 'XoomCric | News',
};

export default async function page() {
  return (
    <ThreeColumnLayout>
      <NewsHome />
    </ThreeColumnLayout>
  );
}
