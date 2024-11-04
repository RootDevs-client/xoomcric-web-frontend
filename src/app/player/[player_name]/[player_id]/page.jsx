import PlayerTabs from './_components/PlayerTabs';

export const metadata = {
  title: 'XoomCric | Players',
  description: 'Explore player profiles and statistics on XoomCric.',
  keywords: 'cricket, players, statistics, profiles, XoomCric',
};

export default async function page({ params }) {
  const { player_id } = params;

  return (
    <div className=" max-w-screen-xl sm:p-4 p-2 mx-auto top-2">
      <PlayerTabs player_id={player_id} />{' '}
    </div>
  );
}
