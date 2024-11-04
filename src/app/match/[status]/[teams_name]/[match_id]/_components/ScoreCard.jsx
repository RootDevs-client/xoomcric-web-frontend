import PointTableCardShimmer from '@/app/series/[series_name]/[series_id]/_conmponents/PointTableCardShimmer';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';

export default function ScoreCard({ match_id }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/mcenter/v1/${match_id}/scard`
      );
      console.log(res?.data, 'ScoreCard');

      setResult(res?.data?.data || {});
    } catch (error) {
      console.error('Error fetching Venues Table Information:', error);
    } finally {
      setLoading(false);
    }
  }
  console.log(result?.scoreCard, 'scoreCard data');

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <PointTableCardShimmer />;
  }

  let count = 1;

  function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  if (!result?.scoreCard || result?.scoreCard?.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div>
      {result?.scoreCard?.map((team, index) => {
        return (
          <div key={index} className="container mx-auto my-4">
            <div className="bg-[#000000] p-4 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold mb-2">
                {team?.batTeamDetails?.batTeamName || ''}{' '}
                {(index + 1) % 2 == 0 ? ordinal(count++) : ordinal(count)}{' '}
                Innings
              </h2>
              <h3 className="text-lg mb-4">
                {team?.scoreDetails?.runs || 0}-
                {team?.scoreDetails?.wickets || 0} (
                {team?.scoreDetails?.overs || 0} Ov)
              </h3>
            </div>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Batter</th>
                  <th className="py-2 px-4 border-b text-left">Dismissal</th>
                  <th className="py-2 px-4 border-b text-right">R</th>
                  <th className="py-2 px-4 border-b text-right">B</th>
                  <th className="py-2 px-4 border-b text-right">4s</th>
                  <th className="py-2 px-4 border-b text-right">6s</th>
                  <th className="py-2 px-4 border-b text-right">SR</th>
                  <th className="py-2 px-4 border-b text-right"></th>
                </tr>
              </thead>
              <tbody>
                {Object?.values(team?.batTeamDetails?.batsmenData)?.map(
                  (player, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">
                        <a
                          href={`/player/${player?.batName}/${player?.batId}`}
                          className="text-blue-600 hover:underline"
                        >
                          {player.batName}
                        </a>
                      </td>
                      <td className="py-2 px-4 text-gray-600">
                        {player.outDesc}
                      </td>
                      <td className="py-2 px-4 text-right font-bold">
                        {player.runs}
                      </td>
                      <td className="py-2 px-4 text-right">{player.balls}</td>
                      <td className="py-2 px-4 text-right">{player.fours}</td>
                      <td className="py-2 px-4 text-right">{player.sixes}</td>
                      <td className="py-2 px-4 text-right">
                        {player.strikeRate}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <table className="w-full bg-white border border-gray-200 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Bowler</th>
                  <th className="py-2 px-4 border-b text-left">Overs</th>
                  <th className="py-2 px-4 border-b text-left">Maidens</th>
                  <th className="py-2 px-4 border-b text-right">Runs</th>
                  <th className="py-2 px-4 border-b text-right">Wickets</th>
                  <th className="py-2 px-4 border-b text-right">Economy</th>
                  <th className="py-2 px-4 border-b text-right">No Balls</th>
                  <th className="py-2 px-4 border-b text-right">Wides</th>
                </tr>
              </thead>
              <tbody>
                {Object?.values(team?.bowlTeamDetails?.bowlersData)?.map(
                  (bowler, index) => (
                    <tr
                      key={bowler.bowlerId}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-2 px-4">
                        <a
                          href={`/player/${bowler.bowlName}/${bowler.bowlerId}`}
                          className="text-blue-600 hover:underline"
                        >
                          {bowler.bowlName}
                        </a>
                      </td>
                      <td className="py-2 px-4">{bowler.overs}</td>
                      <td className="py-2 px-4">{bowler.maidens}</td>
                      <td className="py-2 px-4 text-right font-bold">
                        {bowler.runs}
                      </td>
                      <td className="py-2 px-4 text-right">{bowler.wickets}</td>
                      <td className="py-2 px-4 text-right">{bowler.economy}</td>
                      <td className="py-2 px-4 text-right">
                        {bowler.no_balls}
                      </td>
                      <td className="py-2 px-4 text-right">{bowler.wides}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            <h2 className="p-3 mt-4 bg-gray-800 text-white font-semibold">
              Wickets Overview
            </h2>
            <ul className="space-y-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.values(team?.wicketsData).map((wicket) => (
                <li
                  key={wicket.batId}
                  className="bg-white shadow rounded-lg p-4"
                >
                  <h3 className="text-lg font-semibold">{wicket.batName}</h3>
                  <p className="text-gray-600">
                    Wicket Number: <strong>{wicket.wktNbr}</strong>
                    <br />
                    Over: <strong>{wicket.wktOver}</strong>
                    <br />
                    Runs: <strong>{wicket.wktRuns}</strong>
                    <br />
                    Ball Number: <strong>{wicket.ballNbr}</strong>
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="text-lg">
                Extras: <strong>{team?.extrasData?.total || 0}</strong> (b{' '}
                {team?.extrasData?.byes}, lb {team?.extrasData?.legByes}, w{' '}
                {team?.extrasData?.wides}, nb {team?.extrasData?.noBalls}, p{' '}
                {team?.extrasData?.penalty})
              </div>
              <div className="text-lg">
                Total: <strong>{team?.scoreDetails?.runs}</strong> (
                {team?.scoreDetails?.wickets || 0} wkts,{' '}
                {team?.scoreDetails?.overs || 0} Ov)
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
