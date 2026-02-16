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

  if (loading) {
    return <PointTableCardShimmer />;
  }

  let count = 1;

  function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  if (!result?.scorecard || result?.scorecard?.length === 0) {
    return <NoDataFound />;
  }

  return (
    <div>
      {result?.scorecard?.map((team, index) => {
        return (
          <div key={index} className="container mx-auto my-4">
            <div className="bg-[#000000] p-4 text-white flex justify-between items-center">
              <h2 className="sm:text-xl text-base font-bold mb-2">
                {team?.batTeamName || ''}{' '}
                {/* {(index + 1) % 2 == 0 ? ordinal(count++) : ordinal(count)}{' '} */}
                {team?.inningsid}
                {`" "`} Innings
              </h2>
              <h3 className="text-lg mb-4">
                {team?.score || 0}-{team?.wickets || 0} ({team?.overs || 0} Ov)
              </h3>
            </div>
            <div className=" scrollbar-5">
              <table className="min-w-full bg-white border border-gray-200 sm:text-base text-[.9rem]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-2 sm:px-4 border-b text-left">
                      Batter
                    </th>
                    {/* <th className="py-2 px-2 sm:px-4 border-b text-left">Dismissal</th> */}
                    <th className="py-2 px-2 sm:px-4 border-b text-right">R</th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right">B</th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right">
                      4s
                    </th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right">
                      6s
                    </th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right">
                      SR
                    </th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {team?.partnership?.partnership &&
                    Object?.values(team?.partnership?.partnership)?.map(
                      (player, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-2 sm:px-4">
                            <a
                              href={`/player/${player?.bat1name}/${player?.bat1id}`}
                              className="text-blue-600 hover:underline"
                            >
                              {player.bat1name}
                            </a>
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-gray-600">
                            {player.bat1runs}
                          </td>
                          {/* <td className="py-2 px-2 sm:px-4 text-right font-bold">
                            {player.runs}
                          </td> */}
                          <td className="py-2 px-2 sm:px-4 text-right">
                            {player.bat1balls}
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-right">
                            {player.bat1fours}
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-right">
                            {player.bat1sixes}
                          </td>
                          <td className="py-2 px-2 sm:px-4 text-right">
                            {strikeRate(player.bat1runs, player.bat1balls)}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
            <div className="w-full scrollbar-5">
              <table className="w-full bg-white border border-gray-200 mt-4 sm:text-base text-[.9rem]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-2 sm:px-4 border-b text-left">
                      Bowler
                    </th>
                    <th className="py-2 px-2 sm:px-4 border-b text-left">O</th>
                    <th className="py-2 px-2 sm:px-4 border-b text-left">M</th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right">R</th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right">W</th>
                    <th className="py-2 px-2 sm:px-4 border-b text-right">
                      ER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team?.bowler &&
                    Object?.values(team?.bowler)?.map((bowler, index) => (
                      <tr key={bowler.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 sm:px-4">
                          <a
                            href={`/player/${bowler.name}/${bowler.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {bowler.name}
                          </a>
                        </td>
                        <td className="py-2 px-2 sm:px-4">{bowler.overs}</td>
                        <td className="py-2 px-2 sm:px-4">{bowler.maidens}</td>
                        <td className="py-2 px-2 sm:px-4 text-right font-bold">
                          {bowler.runs}
                        </td>
                        <td className="py-2 px-2 sm:px-4 text-right">
                          {bowler.wickets}
                        </td>
                        <td className="py-2 px-2 sm:px-4 text-right">
                          {bowler.economy}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <h2 className="p-3 mt-4 bg-gray-800 text-white font-semibold">
              Wickets Overview
            </h2>
            <ul className="space-y-4 grid grid-cols-1 sm:mt-0 mt-3 sm:text-base text-[.9rem] sm:grid-cols-3 md:grid-cols-4 gap-4">
              {team?.fow?.fow &&
                Object.values(team?.fow?.fow).map((wicket) => (
                  <li
                    key={wicket.batsmanid}
                    className="bg-white shadow rounded-lg p-4"
                  >
                    <h3 className="sm:text-base text-[.9rem] font-semibold">
                      {wicket.batsmanname}
                    </h3>
                    <p className="text-gray-600">
                      {/* Wicket Number: <strong>{wicket.wktNbr}</strong> */}
                      {/* <br /> */}
                      Over: <strong>{wicket?.overnbr}</strong>
                      <br />
                      Runs: <strong>{wicket.runs}</strong>
                      <br />
                      Ball Number: <strong>{wicket.ballnbr}</strong>
                    </p>
                  </li>
                ))}
            </ul>
            <div className="mt-4">
              <div className="text-[.9rem] sm:text-base">
                Extras: <strong>{team?.extras?.total || 0}</strong> (b{' '}
                {team?.extras?.byes}, lb {team?.extras?.legByes}, w{' '}
                {team?.extras?.wides}, nb {team?.extras?.noBalls}, p{' '}
                {team?.extras?.penalty})
              </div>
              <div className="text-[.9rem] sm:text-base">
                Total: <strong>{team?.score}</strong> ({team?.wickets || 0}{' '}
                wkts, {team?.overs || 0} v)
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function strikeRate(runs, balls) {
  if (balls === 0) return 0; // avoid division by zero
  return ((runs / balls) * 100).toFixed(2);
}
