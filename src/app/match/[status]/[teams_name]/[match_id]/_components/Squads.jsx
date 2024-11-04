import PointTableCardShimmer from '@/app/series/[series_name]/[series_id]/_conmponents/PointTableCardShimmer';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Squads({ match_id }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/mcenter/v1/${match_id}`
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

  console.log('result', result);

  if (
    !result?.matchInfo ||
    (result?.matchInfo?.team1?.playerDetails?.length === 0 &&
      result?.matchInfo?.team2?.playerDetails?.length === 0)
  ) {
    return <NoDataFound />;
  }

  return (
    <div className="">
      <div className="flex items-center justify-center font-bold text-2xl  text-gray-600 bg-gray-100 py-4 px-2 mb-4">
        {/* <Link href="#" className="flex items-center"> */}
        {/* <img
                src={`https://static.cricbuzz.com/a/img/v1/i1/c${player?.faceImageId}/cricket.jpg`}
                alt={player?.name}
                className="w-16 h-16 rounded-full border-4 border-gray-100"
              /> */}
        <span className="ml-2">{result?.matchInfo?.team1?.shortName}</span>
        {/* </Link> */}
        <span className="mx-2 text-sm text-red-400">VS</span>
        {/* <Link
          href="/cricket-team/new-zealand/13/schedule"
          className="flex items-center"
        > */}
        {/* <img
                src={`https://static.cricbuzz.com/a/img/v1/i1/c${player?.faceImageId}/cricket.jpg`}
                alt={player?.name}
                className="w-16 h-16 rounded-full border-4 border-gray-100"
              /> */}
        <span className="ml-2">{result?.matchInfo?.team2?.shortName}</span>
        {/* </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-4">
          {result?.matchInfo?.team1?.playerDetails?.map((player) => (
            <Link
              key={player.id}
              href={`/player/${player.name?.split(' ').join('-')}/${player.id}`}
              className="flex items-center bg-gray-100 p-3  hover:bg-gray-200 transition"
            >
              <img
                src={`https://static.cricbuzz.com/a/img/v1/i1/c${player?.faceImageId}/cricket.jpg`}
                alt={player?.name}
                className="w-16 h-16 rounded-full border-4 border-gray-100 object-cover"
              />
              <div className="ml-3">
                <div>{player.name}</div>
                <span className="text-gray-600">{player.role}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          {result?.matchInfo?.team2?.playerDetails?.map((player) => (
            <Link
              key={player.id}
              href={`/player/${player.name?.split(' ').join('-')}/${player.id}`}
              className="flex items-center bg-gray-100 p-3  hover:bg-gray-200 transition"
            >
              <img
                src={`https://static.cricbuzz.com/a/img/v1/i1/c${player?.faceImageId}/cricket.jpg`}
                alt={player?.name}
                className="w-16 h-16 rounded-full border-4 border-gray-100 object-cover"
              />
              <div className="ml-3">
                <div>{player.name}</div>
                <span className="text-gray-600">{player.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
