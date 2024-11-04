import PlayerTabs from './_components/PlayerTabs';

export const metadata = {
  title: 'XoomCric | Player Details',
  description:
    'Explore comprehensive profiles of your favorite cricket players. Get insights into their stats, career highlights, recent performances, and personal achievements.',
  keywords:
    'cricket player details, player profiles, player statistics, cricket career, XoomCric',
};

export default async function page({ params }) {
  const { player_id } = params;

  return (
    <div className=" max-w-screen-xl sm:p-4 p-2 mx-auto top-2">
      <PlayerTabs player_id={player_id} />{' '}
    </div>
  );
}
