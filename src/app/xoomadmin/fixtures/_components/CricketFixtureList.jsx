import moment from 'moment';
import Link from 'next/link';

const upcoming = ['preview', 'upcoming'];
const live = ['In Progress'];
const complete = ['Complete'];

export default function CricketFixtureList({ match, offset }) {
  const isUpcoming = upcoming.includes(match?.matchInfo?.state);
  const isFinished = complete.includes(match?.matchInfo?.state);
  const matchTime = parseInt(match?.matchInfo?.startDate);

  const teamOneImage = `https://static.cricbuzz.com/a/img/v1/50x30/i1/c${match?.matchInfo?.team1?.imageId}/cricket.jpg`;
  const teamTwoImage = `https://static.cricbuzz.com/a/img/v1/50x30/i1/c${match?.matchInfo?.team2?.imageId}/cricket.jpg`;

  const fixtureDate = moment
    .utc(matchTime)
    .utcOffset(offset)
    .format('YYYY-MM-DD hh:mm A');

  return (
    <tr
      className="h-10 divide-x border-slate-100 text-center !border-b-2"
      key={match?.matchInfo?.matchId}
    >
      <td>
        <span className="font-bold">{match?.matchInfo?.state}</span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <img
            src={teamOneImage}
            alt={match?.matchInfo?.team1?.teamName}
            className="h-7 w-7 rounded-full ring-1 ring-slate-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/team_placeholder.png';
            }}
          />
          <h4 className="text-sm font-semibold uppercase">
            {match?.matchInfo?.team1?.teamName}
          </h4>
        </div>
      </td>
      <td className="text-center">
        <h4 className="border-b border-gray-300 text-base">
          {match?.matchInfo?.matchDesc}
        </h4>
        <p className="font-semibold">
          {isFinished ? match?.matchInfo?.status : fixtureDate}
        </p>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <img
            src={teamTwoImage}
            alt={match?.matchInfo?.team2?.teamName}
            className="h-7 w-7 rounded-full ring-1 ring-slate-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/team_placeholder.png';
            }}
          />
          <h4 className="text-sm font-semibold uppercase">
            {match?.matchInfo?.team2?.teamName}
          </h4>
        </div>
      </td>
      <td className="flex items-center justify-center">
        {isFinished ? (
          <Link
            className="btn btn-info btn-outline btn-sm min-w-[150px] rounded"
            href={`/xoomadmin/highlights/create?fixture_id=${match?.matchInfo?.matchId}&match_title=${match?.matchInfo?.seriesName}&time=${fixtureDate}&category=cricket`}
          >
            Add Highlights
          </Link>
        ) : (
          <Link
            className="btn btn-primary btn-outline btn-sm min-w-[150px] rounded"
            href={`/xoomadmin/manage-live/create?fixture_id=${match?.matchInfo?.matchId}&match_title=${match?.matchInfo?.seriesName}&t1_name=${match?.matchInfo?.team1?.teamName}&t1_img=${teamOneImage}&t2_name=${match?.matchInfo?.team2?.teamName}&t2_img=${teamTwoImage}&time=${fixtureDate}`}
          >
            Add Live
          </Link>
        )}
      </td>
    </tr>
  );
}
