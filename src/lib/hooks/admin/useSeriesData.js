import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';

async function getAllLeagues({ category = 'international' }) {
  const res = await xoomBackendUrl.get(
    `/cric-buzz/cricket/series/v1/${category}`
  );
  return res;
}

export function useSeriesData(category = 'international') {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const leagueResponse = await getAllLeagues({ category });

        const data = leagueResponse?.data?.data?.seriesMapProto?.reduce(
          (acc, curr) => {
            acc.push(...(curr?.series || []));
            return acc;
          },
          []
        );

        setSeriesData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [category]);

  return { seriesData, loading, error };
}
