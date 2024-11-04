import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sportMonkUrl } from '@/lib/axios/getAxios';
import { getServerSession } from 'next-auth';
import LeagueDetails from './_components/LeagueDetails';

export const metadata = {
  title: 'XoomCric | Leagues',
};

async function getSingleLeague(id) {
  const response = await sportMonkUrl.get(
    `/leagues/${id}?include=country;currentSeason;seasons`
  );
  return response;
}

export default async function Page({ params }) {
  const leagueId = params.league_id;
  const session = await getServerSession(authOptions);

  const leagueResponse = await getSingleLeague(leagueId);

  return (
    <LeagueDetails leagueData={leagueResponse.data.data} session={session} />
  );
}
