import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import MatchCommentary from './MatchCommentary';

/** Normalize comm API response (new structure) to the shape MatchCommentary expects. */
function normalizeCommForCommentaryTab(raw) {
  if (!raw) return {};
  const mh = raw.matchheaders ?? raw.matchHeader ?? {};
  const ms = raw.miniscore ?? {};
  const inningsList =
    ms.inningsscores?.inningsscore ??
    ms.matchScoreDetails?.inningsScoreList ??
    [];
  const inningsScoreList = Array.isArray(inningsList)
    ? inningsList.map((s) => ({
        batTeamName: s.batteamshortname ?? s.batTeamName ?? s.batteamname,
        score: s.runs ?? s.score,
        wickets: s.wickets,
        overs: s.overs,
        isDeclared: s.isdeclared ?? s.isDeclared ?? false,
        isFollowOn: s.isfollowon ?? s.isFollowOn ?? false,
      }))
    : [];

  const mapBatsman = (b) =>
    b
      ? {
          batName: b.name ?? b.batName,
          batRuns: b.runs ?? b.batRuns,
          batBalls: b.balls ?? b.batBalls,
          batStrikeRate: b.strkrate ?? b.batStrikeRate,
          batFours: b.fours ?? b.batFours,
          batSixes: b.sixes ?? b.batSixes,
        }
      : null;

  const mapBowler = (b) =>
    b
      ? {
          bowlName: b.name ?? b.bowlName,
          bowlOvs: b.overs ?? b.bowlOvs,
          bowlRuns: b.runs ?? b.bowlRuns,
          bowlWkts: b.wickets ?? b.bowlWkts,
          bowlEcon: b.economy ?? b.bowlEcon,
          bowlMaidens: b.maidens ?? b.bowlMaidens,
        }
      : null;

  const comwrapper = raw.comwrapper ?? [];
  const commentaryList = Array.isArray(raw.commentaryList)
    ? raw.commentaryList
    : (comwrapper ?? []).map((item) => {
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

  return {
    matchHeader: {
      seriesName: mh.seriesname ?? mh.seriesName ?? '',
      matchDescription: mh.matchdesc ?? mh.matchDescription ?? '',
      status: mh.status ?? '',
    },
    miniscore: {
      matchScoreDetails: { inningsScoreList },
      lastWicket: ms.lastwkt ?? ms.lastWicket ?? '',
      recentOvsStats: ms.curovsstats ?? ms.recentOvsStats ?? '',
      batsmanStriker: mapBatsman(ms.batsmanstriker ?? ms.batsmanStriker),
      batsmanNonStriker: mapBatsman(
        ms.batsmannonstriker ?? ms.batsmanNonStriker
      ),
      bowlerStriker: mapBowler(ms.bowlerstriker ?? ms.bowlerStriker),
      bowlerNonStriker: mapBowler(ms.bowlernonstriker ?? ms.bowlerNonStriker),
    },
    commentaryList,
  };
}

export default function Commentary({ match_id }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/mcenter/v1/${match_id}/comm`
      );
      const raw = res?.data?.data ?? {};
      setResult(normalizeCommForCommentaryTab(raw));
    } catch (error) {
      setLoading(false);

      console.error('Error fetching Venues Table Information:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const Shimmer = ({ height, width }) => (
    <div
      className={`bg-gray-300 animate-pulse mb-2 rounded ${height} ${width}`}
    />
  );

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <Shimmer height="h-10" width="w-3/4" />
        <Shimmer height="h-8" width="w-1/2" className="mt-2" />
        <Shimmer height="h-6" width="w-full" className="mt-4" />

        <div className="font-semibold text-black mt-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="mb-2">
              <Shimmer height="h-6" width="w-1/3" />
            </div>
          ))}
        </div>

        <div className="mt-3 gap-3 flex">
          <Shimmer height="h-6" width="w-1/4" />
        </div>

        <div className="overflow-x-auto rounded-lg mb-3">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                {['Batter', 'R', 'B', 'SR', '4S', '6S'].map((header) => (
                  <th key={header} className="border px-4 py-2 text-start">
                    <Shimmer height="h-6" width="w-16" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 2 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {Array.from({ length: 6 }).map((_, cellIndex) => (
                    <td key={cellIndex} className="border px-4 py-2 text-start">
                      <Shimmer height="h-6" width="w-16" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-gray-800">Commentary</h3>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b pb-2 last:border-b-0">
              <Shimmer height="h-4" width="w-full" />
              <Shimmer height="h-4" width="w-3/4" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!result) {
    return <NoDataFound />;
  }
  return <MatchCommentary data={result} />;
}
