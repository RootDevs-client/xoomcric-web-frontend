import MatchTabs from './_components/matchTabs';

export default function page({ params }) {
  const { match_id, teams_name, status } = params;

  return (
    // <ThreeColumnLayout>
    //   <PlayerTabs player_id={player_id} />
    // </ThreeColumnLayout>
    <div className=" max-w-screen-xl p-4 mx-auto top-2">
      <h1 className="font-semibold text-xl sm:text-3xl mb-5 ">
        {teams_name
          ?.replace(/-/g, ' ')
          .replace(/(\d{4}) (\d{2})$/, '$1-$2')
          .toUpperCase()}
      </h1>
      <MatchTabs match_id={match_id} status={status} />
    </div>
  );
}
