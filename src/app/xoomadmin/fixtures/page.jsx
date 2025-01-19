import BreadCrumb from '@/components/Global/BreadCrumb';
import CricBuzzFixtureContainer from './_components/CricBuzzFixtureContainer';

export default async function Page() {
  const breadMenu = {
    path1: 'fixtures',
    link1: '/admin/fixtures',
  };

  return (
    <>
      <div className="flex items-center justify-between px-5">
        <BreadCrumb breadMenu={breadMenu} />
      </div>
      <div className="p-4">
        <CricBuzzFixtureContainer />
      </div>
    </>
  );
}
