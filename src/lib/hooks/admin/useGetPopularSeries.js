import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetPopularSeries(token) {
  console.log('token here', token);

  const {
    isLoading: popularSeriesLoading,
    data: popularSeries,
    refetch: popularSeriesRefetch,
  } = useQuery('popular-Series', async () => {
    const response = await xoomBackendUrl.get(`api/admin/popular-series`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all Series data');
    }
  });
  return { popularSeries, popularSeriesLoading, popularSeriesRefetch };
}
