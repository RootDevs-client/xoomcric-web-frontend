import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import SeriesTabs from './_conmponents/SeriesTabs';

export const metadata = {
  title: 'XoomCric | Series Details',
  description:
    'Get in-depth information about cricket series, including match schedules, team lineups, results, and historical statistics. Stay updated on the latest series events and performances.',
  keywords:
    'cricket series details, match schedules, team lineups, series results, cricket statistics, XoomCric',
};

export default async function page({ params }) {
  const { series_id, series_name } = params;
  const session = await getServerSession(authOptions);

  return (
    // <ThreeColumnLayout>
    //   <PlayerTabs player_id={player_id} />
    // </ThreeColumnLayout>
    <div className=" max-w-screen-xl p-4 mx-auto top-2">
      <SeriesTabs
        series_id={series_id}
        series_name={series_name}
        session={session}
      />
    </div>
  );
}
