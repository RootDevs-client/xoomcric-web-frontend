import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import MatchCommentary from './MatchCommentary';

export default function Commentary({ match_id }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/mcenter/v1/${match_id}/comm`
      );

      setResult(res?.data?.data || {});
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
