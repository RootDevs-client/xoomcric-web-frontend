import PointTableCardShimmer from '@/app/series/[series_name]/[series_id]/_conmponents/PointTableCardShimmer';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import moment from 'moment';
import { useEffect, useState } from 'react';

// Function to categorize players
const categorizePlayers = (players) => {
  const playing = [];
  const bench = [];
  const supportStaff = [];

  players?.forEach((player) => {
    if (player.substitute) {
      bench.push(player.name);
    } else if (player.role === 'WK-Batsman' && player.keeper) {
      playing.push(player.name); // WK-Batsman who is a keeper goes to playing XI
    } else if (!player.substitute && player.captain) {
      playing.unshift(player.name); // Captain should always be in playing XI
    } else if (!player.substitute) {
      playing.push(player.name); // All other players who are not substitutes
    }

    // Adding support staff
    if (player.isSupportStaff) {
      supportStaff.push(player.name);
    }
  });

  return { playing, bench, supportStaff };
};

export default function MatchInfo({ match_id }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/mcenter/v1/${match_id}`
      );
      console.log(res?.data, 'MatchInfo');

      setResult(res?.data?.data || {});
    } catch (error) {
      console.error('Error fetching Venues Table Information:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(result?.matchInfo);

  if (loading) {
    return <PointTableCardShimmer />;
  }
  if (!result) {
    return <NoDataFound />;
  }
  const { playing, bench, supportStaff } = categorizePlayers(
    result?.matchInfo?.team1?.playerDetails
  );

  const {
    playing: team2Playing,
    bench: team2Bench,
    supportStaff: team2SupportStaff,
  } = categorizePlayers(result?.matchInfo?.team2?.playerDetails);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Match Info Section */}
        <div className="bg-[#000000] text-white p-4">
          <h2 className="text-lg font-bold">Match Info</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 gap-2 text-gray-700">
            <p>
              <span className="font-semibold">Match:</span>{' '}
              {result?.matchInfo?.team1?.shortName} VS{' '}
              {result?.matchInfo?.team2?.shortName},{' '}
              {result?.matchInfo?.matchDescription},{' '}
              {result?.matchInfo?.series?.name}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              {moment(result?.matchInfo?.matchStartTimestamp).format(
                'dddd, MMMM D, YYYY'
              )}{' '}
              -{' '}
              {moment(result?.matchInfo?.matchCompleteTimestamp).format(
                'dddd, MMMM D, YYYY'
              )}
            </p>
            <p>
              <span className="font-semibold">Toss:</span>{' '}
              {result?.matchInfo?.status}
            </p>
            <p>
              <span className="font-semibold">Time:</span>{' '}
              {moment(result?.matchInfo?.matchStartTimestamp).format('h:mm A')}
            </p>
            <p>
              <span className="font-semibold">Venue:</span>{' '}
              {result?.matchInfo?.venue?.name}
            </p>
            {result?.matchInfo?.umpire1?.name ||
              (result?.matchInfo?.umpire2?.name && (
                <p>
                  <span className="font-semibold">Umpires:</span>{' '}
                  {`${result?.matchInfo?.umpire1?.name}, ${result?.matchInfo?.umpire2?.name}`}
                </p>
              ))}
            {result?.matchInfo?.umpire3?.name && (
              <p>
                <span className="font-semibold">Third Umpire:</span>{' '}
                {result?.matchInfo?.umpire3?.name}
              </p>
            )}
            {result?.matchInfo?.referee?.name && (
              <p>
                <span className="font-semibold">Match Referee:</span>{' '}
                {result?.matchInfo?.referee?.name}
              </p>
            )}
          </div>

          {/* Squad Section 1*/}
          <div className="mt-6 grid gap-2">
            <h3 className="font-bold text-lg text-gray-800">
              {result?.matchInfo?.team1?.name} Squad:
            </h3>
            <p>
              <span className="font-semibold">Playing:</span>{' '}
              {playing?.length ? playing?.join(', ') : 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Bench:</span>{' '}
              {bench?.length ? bench?.join(', ') : 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Support Staff:</span>{' '}
              {supportStaff?.length ? supportStaff.join(', ') : 'N/A'}
            </p>
          </div>

          {/*  Squad Section 2*/}
          <div className="mt-6 grid gap-2">
            <h3 className="font-bold text-lg text-gray-800">
              {result?.matchInfo?.team2?.name} Squad:
            </h3>
            <p>
              <span className="font-semibold">Playing:</span>{' '}
              {team2Playing?.length ? team2Playing?.join(', ') : 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Bench:</span>{' '}
              {team2Bench?.length ? team2Bench?.join(', ') : 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Support Staff:</span>{' '}
              {team2SupportStaff?.length
                ? team2SupportStaff?.join(', ')
                : 'N/A'}
            </p>
          </div>

          {/* Venue Guide Section */}
          <div className="mt-6 bg-[#000000] text-white p-4">
            <h2 className="text-lg font-bold">Venue Guide</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-2 text-gray-700">
              <p>
                <span className="font-semibold">Stadium:</span>{' '}
                {result?.matchInfo?.venue?.name}
              </p>
              <p>
                <span className="font-semibold">City:</span>{' '}
                {result?.matchInfo?.venue?.city}
              </p>
              {result?.matchInfo?.venue?.capacity && (
                <p>
                  <span className="font-semibold">Capacity:</span>{' '}
                  {result?.matchInfo?.venue?.capacity}
                </p>
              )}
              {result?.matchInfo?.venue?.ends && (
                <p>
                  <span className="font-semibold">Ends:</span>{' '}
                  {result?.matchInfo?.venue?.ends}
                </p>
              )}
              {result?.matchInfo?.venue?.hosts && (
                <p>
                  <span className="font-semibold">Hosts to:</span>{' '}
                  {result?.matchInfo?.venue?.hosts}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
