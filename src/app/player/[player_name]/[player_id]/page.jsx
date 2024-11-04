import PlayerTabs from './_components/PlayerTabs';

export const metadata = {
  title: 'XoomCric | Players',
};

export default async function page({ params }) {
  const { player_id } = params;

  return (
    // <ThreeColumnLayout>
    //   <PlayerTabs player_id={player_id} />
    // </ThreeColumnLayout>
    <div className=" max-w-screen-xl p-4 mx-auto top-2">
      <PlayerTabs player_id={player_id} />{' '}
    </div>
  );
}
