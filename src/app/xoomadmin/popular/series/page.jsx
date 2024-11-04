import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import PopularSeriesList from './_components/PopularSeriesList';

async function getAllLeagues() {
  const res = await xoomBackendUrl.get(
    `/cric-buzz/cricket/series/v1/international`
  );
  return res;
}

export const metadata = {
  title: 'XoomCric Admin | Popular Series',
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user?.role === 'user') {
      redirect('/');
    }
  }

  const leagueResponse = await getAllLeagues();

  const seriesData = leagueResponse?.data?.data?.seriesMapProto?.reduce(
    (acc, curr) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      acc.push(...curr?.series);
      return acc;
    },
    []
  );

  if (!leagueResponse.status === 200) {
    return 'Server Error!';
  } else {
    if (leagueResponse?.data?.status) {
      return <PopularSeriesList seriesData={seriesData} session={session} />;
    } else {
      return 'Server Error!';
    }
  }
}
