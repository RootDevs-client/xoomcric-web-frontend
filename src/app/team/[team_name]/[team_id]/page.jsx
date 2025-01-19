import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import Link from 'next/link';
import TeamTabs from './_components/TeamTabs';

export const metadata = {
  title: 'XoomCric | Team Details',
  description:
    'Explore detailed profiles of cricket teams, including player rosters, match performance, historical records, and upcoming fixtures. Stay informed about your favorite teams in the cricket world.',
  keywords:
    'cricket team details, team profiles, player rosters, match performance, cricket history, XoomCric',
};

export default async function page({ params }) {
  const { team_name, team_id } = params;

  try {
    const res = await xoomBackendUrl.post(
      `/cric-buzz/cricket/teams/v1/international`
    );

    return (
      <div className="max-w-screen-xl p-4 mx-auto top-2">
        <TeamTabs
          team_id={team_id}
          team_name={team_name}
        
          teamList={res?.data?.data?.list || []}
        />
      </div>
    );
  } catch (error) {
    console.error('Error fetching team data:', error);
    return (
      <div className="max-w-screen-xl p-4 mx-auto top-2">
        <NoDataFound />
        <div className="flex justify-center items-center mt-5">
          <Link
            className="bg-red-500 text-white font-bold  rounded-lg px-4 py-2"
            href={`/`}
          >
            Go To The Home
          </Link>
        </div>
      </div>
    );
  }
}
