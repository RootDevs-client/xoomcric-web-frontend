import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BreadCrumb from '@/components/Global/BreadCrumb';
import { getServerSession } from 'next-auth';
import CricBuzzFixtureContainer from './_components/CricBuzzFixtureContainer';

export default async function Page() {
  // const cookieStore = cookies();
  const session = await getServerSession(authOptions);
  // const token = cookieStore.get('_token');

  // if (!token) {
  //   redirect('/admin/login');
  // }

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
        <CricBuzzFixtureContainer session={session} />
      </div>
    </>
  );
}
