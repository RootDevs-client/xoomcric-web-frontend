import PointTableCardShimmer from '@/app/series/[series_name]/[series_id]/_conmponents/PointTableCardShimmer';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import moment from 'moment';
import { useEffect, useState } from 'react';

const categorizePlayers = (players) => {
  if (!players || !Array.isArray(players))
    return { playing: [], bench: [], supportStaff: [] };

  const playing = [];
  const bench = [];
  const supportStaff = [];

  players.forEach((player) => {
    if (player.substitute) {
      bench.push(player.name);
    } else if (player.role === 'WK-Batsman' && player.keeper) {
      playing.push(player.name);
    } else if (!player.substitute && player.captain) {
      playing.unshift(player.name);
    } else if (!player.substitute) {
      playing.push(player.name);
    }

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
      // Based on your JSON, the data is likely directly in res.data or res.data.data
      setResult(res?.data?.data || {});
    } catch (error) {
      console.error('Error fetching Match Information:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [match_id]);

  if (loading) return <PointTableCardShimmer />;
  if (!result || !result.matchid) return <NoDataFound />;

  // Mapping based on your provided JSON structure
  const { playing, bench, supportStaff } = categorizePlayers(
    result.team1?.playerDetails
  );
  const {
    playing: team2Playing,
    bench: team2Bench,
    supportStaff: team2SupportStaff,
  } = categorizePlayers(result.team2?.playerDetails);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#000000] text-white p-4">
          <h2 className="text-lg font-bold">Match Info</h2>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-2 text-gray-700">
            <p>
              <span className="font-semibold">Match:</span>{' '}
              {result.team1?.teamsname} VS {result.team2?.teamsname},{' '}
              {result.matchdesc}, {result.seriesname}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              {moment(result.startdate).format('dddd, MMMM D, YYYY')} -{' '}
              {moment(result.enddate).format('dddd, MMMM D, YYYY')}
            </p>
            <p>
              <span className="font-semibold">Toss:</span>{' '}
              {result.tossstatus || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Time:</span>{' '}
              {moment(result.startdate).format('h:mm A')}
            </p>
            <p>
              <span className="font-semibold">Venue:</span>{' '}
              {result.venueinfo?.ground}, {result.venueinfo?.city}
            </p>

            {result.umpire1?.name && (
              <p>
                <span className="font-semibold">Umpires:</span>{' '}
                {result.umpire1.name}
                {result.umpire2?.name ? `, ${result.umpire2.name}` : ''}
              </p>
            )}

            {result.referee?.name && (
              <p>
                <span className="font-semibold">Match Referee:</span>{' '}
                {result.referee.name}
              </p>
            )}
          </div>

          {/* Squad Section - Only renders if data exists */}
          {result.team1?.playerDetails && (
            <div className="mt-6 grid gap-2">
              <h3 className="font-bold text-lg text-gray-800">
                {result.team1.teamname} Squad:
              </h3>
              <p>
                <span className="font-semibold">Playing:</span>{' '}
                {playing.length ? playing.join(', ') : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Bench:</span>{' '}
                {bench.length ? bench.join(', ') : 'N/A'}
              </p>
            </div>
          )}

          <div className="mt-6 bg-[#000000] text-white p-4">
            <h2 className="text-lg font-bold">Venue Guide</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 gap-2 text-gray-700">
              <p>
                <span className="font-semibold">Stadium:</span>{' '}
                {result.venueinfo?.ground}
              </p>
              <p>
                <span className="font-semibold">City:</span>{' '}
                {result.venueinfo?.city}
              </p>
              {result.venueinfo?.capacity && (
                <p>
                  <span className="font-semibold">Capacity:</span>{' '}
                  {result.venueinfo.capacity}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
