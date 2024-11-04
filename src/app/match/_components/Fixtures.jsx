import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Tabs from './Tabs';

export default async function Fixtures() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* <DatePicker /> */}
      <Tabs session={session} />

      {/* <FixtureList /> */}
    </>
  );
}
