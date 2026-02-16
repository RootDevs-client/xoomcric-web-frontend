import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiCricketBall } from 'react-icons/bi';
import { GiCricketBat } from 'react-icons/gi';
import { LuRefreshCw } from 'react-icons/lu';
import LiveCommentary from './LiveCommentary';
import MatchLiveShimmer from './MatchLiveShimmer';
import PlayerCard from './PlayerCard';

/** Normalize overs API response (new structure) to the shape the UI expects. */
function normalizeOversResponse(raw) {
  if (!raw) return {};
  const ms = raw.miniscore ?? {};
  const mh = raw.matchheaders ?? {};
  const inningsList = ms.inningsscores?.inningsscore ?? [];
  const normalizedInnings = Array.isArray(inningsList)
    ? inningsList.map((s) => ({
        batTeamId: s.batteamid ?? s.batTeamId,
        inningsId: s.inningsid ?? s.inningsId,
        batteamshortname: s.batteamshortname ?? s.batTeamShortName,
        score: s.runs ?? s.score,
        wickets: s.wickets,
        overs: s.overs,
      }))
    : [];

  const mapBatsman = (b) =>
    b
      ? {
          batName: b.name ?? b.batName,
          batId: b.id ?? b.batId,
          batRuns: b.runs ?? b.batRuns,
          batBalls: b.balls ?? b.batBalls,
          batFours: b.fours ?? b.batFours,
          batSixes: b.sixes ?? b.batSixes,
          batStrikeRate: b.strkrate ?? b.batStrikeRate,
        }
      : null;

  const mapBowler = (b) =>
    b
      ? {
          bowlName: b.name ?? b.bowlName,
          bowlId: b.id ?? b.bowlId,
          bowlOvs: b.overs ?? b.bowlOvs,
          bowlMaidens: b.maidens ?? b.bowlMaidens,
          bowlRuns: b.runs ?? b.bowlRuns,
          bowlWkts: b.wickets ?? b.bowlWkts,
          bowlEcon: b.economy ?? b.bowlEcon,
        }
      : null;

  const momPlayers = mh.momplayers?.player ?? [];
  const mosPlayers = mh.mosplayers?.player ?? [];
  const mapPlayer = (p) =>
    p
      ? {
          id: p.id,
          name: p.name ?? '',
          faceImageId: p.faceimageid ?? p.imageid ?? p.faceImageId ?? 0,
        }
      : null;

  return {
    matchScoreDetails: {
      state: mh.state ?? raw.matchScoreDetails?.state,
      customStatus: ms.custstatus ?? raw.matchScoreDetails?.customStatus,
    },
    miniscore: {
      id: ms.batteamscore?.teamid ?? ms.batTeamScore?.teamId ?? ms.id,
      inningsscores: { inningsscore: normalizedInnings },
    },
    batTeam: {
      teamId:
        ms.batteamscore?.teamid ??
        ms.batTeamScore?.teamId ??
        raw.batTeam?.teamId,
    },
    currentRunRate: ms.crr ?? raw.currentRunRate,
    status: mh.status ?? raw.status,
    matchHeader: {
      playersOfTheMatch: Array.isArray(momPlayers)
        ? momPlayers.map(mapPlayer).filter(Boolean)
        : (raw.matchHeader?.playersOfTheMatch ?? []),
      playersOfTheSeries: Array.isArray(mosPlayers)
        ? mosPlayers.map(mapPlayer).filter(Boolean)
        : (raw.matchHeader?.playersOfTheSeries ?? []),
    },
    batsmanStriker: mapBatsman(ms.batsmanstriker ?? ms.batsmanStriker),
    batsmanNonStriker: mapBatsman(ms.batsmannonstriker ?? ms.batsmanNonStriker),
    bowlerStriker: mapBowler(ms.bowlerstriker ?? ms.bowlerStriker),
    bowlerNonStriker: mapBowler(ms.bowlernonstriker ?? ms.bowlerNonStriker),
    recentOvsStats: ms.curovsstats ?? raw.recentOvsStats,
    lastWicket: ms.lastwkt ?? raw.lastWicket,
  };
}

/** Normalize commentary API response (new structure) to the shape the UI expects. */
function normalizeCommentaryResponse(raw) {
  if (!raw) return { commentaryList: [] };
  const list = raw.commentaryList ?? raw.comwrapper ?? [];
  if (Array.isArray(list) && list.length === 0) {
    return { ...raw, commentaryList: [] };
  }
  if (Array.isArray(raw.commentaryList)) {
    return raw;
  }
  const commentaryList = (raw.comwrapper ?? []).map((item) => {
    const c = item.commentary ?? item;
    const commtxt = c.commtxt ?? c.commText ?? '';
    const overnum = c.overnum ?? c.overNumber ?? c.overNum;
    const timestamp = c.timestamp ?? 0;
    const formats = c.commentaryformats ?? c.commentaryFormats ?? [];
    const boldEntry = Array.isArray(formats)
      ? formats.find((f) => (f.type ?? '').toLowerCase() === 'bold')
      : null;
    const valueArr = boldEntry?.value ?? [];
    const formatId = Array.isArray(valueArr)
      ? valueArr.map((v) => v.id ?? v.formatId)
      : [];
    const formatValue = Array.isArray(valueArr)
      ? valueArr.map((v) => v.value ?? v.formatValue)
      : [];
    return {
      commText: commtxt,
      overNumber: overnum,
      timestamp,
      commentaryFormats: {
        bold: {
          formatId: formatId.filter(Boolean),
          formatValue: formatValue.filter(Boolean),
        },
      },
    };
  });
  return { ...raw, commentaryList };
}

export default function MatchLive({ match_id }) {
  const [result, setResult] = useState(null);
  const [commentary, setCommentary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const { teams_name } = useParams();

  async function getData() {
    setLoading(true);

    try {
      const [res, comm] = await Promise.all([
        xoomBackendUrl.post(`/cric-buzz/cricket/mcenter/v1/${match_id}/overs`),
        xoomBackendUrl.post(`/cric-buzz/cricket/mcenter/v1/${match_id}/comm`),
      ]);
      const oversRaw = res?.data?.data ?? {};
      const commRaw = comm?.data?.data ?? {};
      setResult(normalizeOversResponse(oversRaw));
      setCommentary(normalizeCommentaryResponse(commRaw));
    } catch (error) {
      console.error('Error fetching cricket data:', error.message || error);
    } finally {
      setLoading(false);
    }
  }

  async function refreshData() {
    try {
      const [res, comm] = await Promise.all([
        xoomBackendUrl.post(`/cric-buzz/cricket/mcenter/v1/${match_id}/overs`),
        xoomBackendUrl.post(`/cric-buzz/cricket/mcenter/v1/${match_id}/comm`),
      ]);
      const oversRaw = res?.data?.data ?? {};
      const commRaw = comm?.data?.data ?? {};
      setResult(normalizeOversResponse(oversRaw));
      setCommentary(normalizeCommentaryResponse(commRaw));
    } catch (error) {
      console.error('Error fetching Venues Table Information:', error);
      setRefresh(false);
    } finally {
      toast.success('Refresh Successfully!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setRefresh(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <MatchLiveShimmer />;
  }

  if (!result) {
    return <NoDataFound />;
  }

  function findLatestInningsForEachTeam(data) {
    const latestInningsMap = {};

    data.forEach((item) => {
      const { batTeamId, inningsId } = item;

      // Check if the teamId is already in the map
      if (!latestInningsMap[batTeamId]) {
        latestInningsMap[batTeamId] = item; // Initialize with the first item
      } else if (inningsId > latestInningsMap[batTeamId].inningsId) {
        latestInningsMap[batTeamId] = item; // Update if the current inningsId is larger
      }
    });

    // Return the values from the map as an array
    return Object.values(latestInningsMap);
  }

  const teams = findLatestInningsForEachTeam(
    result?.miniscore?.inningsscores?.inningsscore || []
  );
  const homeTeam = teams[0];
  const awayTeam = teams[1];

  return (
    <div className="w-full ">
      {result?.matchScoreDetails?.state == 'In Progress' && (
        <div className=" max-w-screen-xl sm:p-4 mx-auto flex justify-end items-end ">
          <div className=" fixed z-20  bottom-32 ">
            {/* <span>Refresh Now</span> */}
            <LuRefreshCw
              className={`text-3xl animate-bounce text-red-500 cursor-pointer border border-red-100 p-1 backdrop-blur-sm rounded-full   w-10 h-10  ${
                refresh && 'animate-spin !text-red-400'
              }`}
              onClick={() => {
                setRefresh(true);
                refreshData();
              }}
            />
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg  w-full ">
        {(awayTeam?.batteamshortname || homeTeam?.batteamshortname) && (
          <div className="flex justify-center gap-6 items-center mb-5">
            <div className="text-center">
              <Link
                href={`/team/${homeTeam?.batteamshortname}/${homeTeam?.batteamid}`}
                className="text-lg font-semibold flex items-center gap-1"
              >
                {homeTeam?.batTeamId === result?.miniscore?.id ? (
                  <GiCricketBat className="rotate-180" />
                ) : (
                  <BiCricketBall />
                )}
                {homeTeam?.batteamshortname || teams_name?.split('-')[0]}
              </Link>
              <p>{`${homeTeam?.score || 0}/${homeTeam?.wickets || 0} (${
                homeTeam?.overs || 0.0
              })`}</p>
            </div>
            <div className="text-center">
              <p className=" py-2 px-4 border text-sm border-gray-300 rounded-full font-bold">
                {result?.matchScoreDetails?.state == 'In Progress' ? (
                  <div className="text-red-500 text-xs font-bold flex items-center gap-1">
                    <span className="animate-pulse">●</span> Live
                  </div>
                ) : result?.matchScoreDetails?.state === 'Complete' ? (
                  <span className="text-[#00B74A]">
                    {result?.matchScoreDetails?.state}
                  </span>
                ) : (
                  result?.matchScoreDetails?.state || 'N/A'
                )}
              </p>
              <p className="text-xl font-bold text-red-400">VS</p>
            </div>
            <div className="text-center">
              <Link
                href={`/team/${awayTeam?.batteamshortname}/${awayTeam?.batteamid}`}
                className="text-lg font-semibold flex items-center gap-1"
              >
                {awayTeam?.batTeamId === result?.batTeam?.teamId ? (
                  <GiCricketBat className=" rotate-180" />
                ) : (
                  <BiCricketBall />
                )}{' '}
                {awayTeam?.batteamshortname || teams_name?.split('-')[2]}
              </Link>
              <p>{`${awayTeam?.score || 0}/${awayTeam?.wickets || 0} (${
                awayTeam?.overs || 0.0
              })`}</p>
            </div>
          </div>
        )}
        {result?.matchScoreDetails?.state == 'In Progress' && (
          <div>
            {result?.currentRunRate !== 0 && (
              <p className="text-center text-lg font-light mb-1">
                CRR: {result?.currentRunRate || ''}
              </p>
            )}
          </div>
        )}
        {(result?.status || result?.matchScoreDetails?.customStatus) && (
          <p className="text-center text-lg font-light  mb-4 text-red-500">
            {result?.status || result?.matchScoreDetails?.customStatus || ''}
          </p>
        )}
        {/* {result?.matchHeader?.playersOfTheSeries ||
          (result?.matchHeader?.playersOfTheMatch && ( */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          {result?.matchHeader?.playersOfTheMatch && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">
              {result?.matchHeader?.playersOfTheMatch.map((player, index) => (
                <PlayerCard
                  key={index}
                  id={player?.id}
                  name={player.name || ''}
                  faceImageId={player?.faceImageId || 0}
                  status={'PLAYER OF THE MATCH'}
                />
              ))}
            </div>
          )}
          {result?.matchHeader?.playersOfTheSeries && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 ">
              {result?.matchHeader?.playersOfTheSeries.map((player, index) => (
                <PlayerCard
                  key={index}
                  id={player?.id}
                  name={player.name || ''}
                  faceImageId={player?.faceImageId || 0}
                  status="PLAYER OF THE SERIES"
                />
              ))}
            </div>
          )}
        </div>
        {/* ))} */}
        <div className={`w-full `}>
          <div
            className={` ${
              result?.batsmanNonStriker?.batName &&
              'overflow-x-auto scrollbar-5 sm:scrollbar-0'
            }`}
          >
            {result?.batsmanStriker?.batName && (
              <table className="min-w-full border-collapse border border-gray-300 mb-5">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                      Batter
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      R
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      B
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      4s
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      6s
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      SR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result?.batsmanStriker?.batName && (
                    <tr className="border-b">
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 hover:text-red-400">
                        <Link
                          href={`/player/${result?.batsmanStriker.batName}/${result?.batsmanStriker.batId}`}
                        >
                          {result?.batsmanStriker.batName}{' '}
                          <span className="text-red-400 font-semibold">*</span>
                        </Link>
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanStriker.batRuns}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanStriker.batBalls}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanStriker.batFours}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanStriker.batSixes}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanStriker.batStrikeRate}
                      </td>
                    </tr>
                  )}
                  {result?.batsmanNonStriker?.batName && (
                    <tr className="border-b">
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 hover:text-red-400">
                        <Link
                          href={`/player/${result?.batsmanNonStriker?.batName}/${result?.batsmanNonStriker?.batId}`}
                        >
                          {result?.batsmanNonStriker?.batName}
                        </Link>
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanNonStriker?.batRuns}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanNonStriker?.batBalls}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanNonStriker?.batFours}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanNonStriker?.batSixes}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.batsmanNonStriker?.batStrikeRate}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          <div
            className={`${
              result?.bowlerStriker?.bowlName &&
              'overflow-x-auto scrollbar-5 sm:scrollbar-0'
            }`}
          >
            {result?.bowlerStriker?.bowlName && (
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                      Bowler
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      O
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      M
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      R
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      W
                    </th>
                    <th className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                      ER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result?.bowlerStriker?.bowlName && (
                    <tr className="border-b">
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 hover:text-red-400">
                        <Link
                          href={`/player/${result?.bowlerStriker?.bowlName}/${result?.bowlerStriker?.bowlId}`}
                        >
                          {result?.bowlerStriker?.bowlName}{' '}
                          <span className="text-red-400 font-semibold">*</span>
                        </Link>
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerStriker?.bowlOvs}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerStriker?.bowlMaidens}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerStriker?.bowlRuns}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerStriker?.bowlWkts}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerStriker?.bowlEcon}
                      </td>
                    </tr>
                  )}
                  {result?.bowlerNonStriker?.bowlName && (
                    <tr className="border-b">
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 hover:text-red-400">
                        <Link
                          href={`/player/${result?.bowlerNonStriker?.bowlName}/${result?.bowlerNonStriker?.bowlId}`}
                        >
                          {result?.bowlerNonStriker?.bowlName}
                        </Link>
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerNonStriker?.bowlOvs}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerNonStriker?.bowlMaidens}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerNonStriker?.bowlRuns}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerNonStriker?.bowlWkts}
                      </td>
                      <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">
                        {result?.bowlerNonStriker?.bowlEcon}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {result?.recentOvsStats && (
          <div className="mb-4 mt-4 flex justify-start items-center gap-2">
            <h2 className="text-lg font-bold mb-2">Recent: </h2>
            {/* <RecentOvsStats recentOvsStats={result?.recentOvsStats} /> */}
            <span>{result?.recentOvsStats}</span>
          </div>
        )}
        {result?.lastWicket && (
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Last Wicket</h2>
            <p className="text-gray-700">{result?.lastWicket}</p>
          </div>
        )}
        <div className="mb-4">
          <LiveCommentary result={commentary} loading={loading} />
        </div>
      </div>
    </div>
  );
}
