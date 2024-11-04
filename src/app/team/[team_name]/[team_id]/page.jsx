import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { getServerSession } from 'next-auth';
import TeamTabs from './_components/TeamTabs';

export const metadata = {
  title: 'XoomCric | Teams',
};

export default async function page({ params }) {
  const { team_name, team_id } = params;
  const session = await getServerSession(authOptions);

  const res = await xoomBackendUrl.post(
    `/cric-buzz/cricket/teams/v1/international`
  );

  return (
    <div className=" max-w-screen-xl p-4 mx-auto top-2">
      <TeamTabs
        team_id={team_id}
        team_name={team_name}
        session={session}
        teamList={res?.data?.data?.list || []}
      />
    </div>
  );
}
