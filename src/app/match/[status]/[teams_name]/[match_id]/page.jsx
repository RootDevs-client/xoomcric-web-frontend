import { xoomBackendUrl } from '@/lib/axios/getAxios';
import MatchTabs from './_components/matchTabs';

export default async function page({ params }) {
  const { match_id, teams_name, status } = params;
  const res = await xoomBackendUrl.post(
    `/cric-buzz/cricket/mcenter/v1/${match_id}`
  );

  return (
    // <ThreeColumnLayout>
    //   <PlayerTabs player_id={player_id} />
    // </ThreeColumnLayout>
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
