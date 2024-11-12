import { xoomBackendUrl } from '@/lib/axios/getAxios';
import MatchTabs from './_components/matchTabs';

export const metadata = {
  title: 'XoomCric | Match Details',
  description:
    'Get comprehensive details on the latest cricket matches, including team lineups, live scores, match statistics, and expert analyses. Stay informed with real-time updates and in-depth commentary.',
  keywords:
    'cricket match details, live scores, match statistics, team lineups, cricket analysis, XoomCric',
};
export default async function page({ params }) {
  const { match_id, teams_name, status } = params;
  const res = await xoomBackendUrl.post(
    `/cric-buzz/cricket/mcenter/v1/${match_id}`
  );

  return (
    <div className="max-w-screen-xl sm:p-4 p-2 mx-auto top-2">
      <MatchTabs
        match_id={match_id}
        status={status}
        teams_name={teams_name}
        match={res?.data?.data}
      />
    </div>
  );
}
