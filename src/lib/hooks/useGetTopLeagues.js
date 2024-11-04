import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetTopSeries() {
  const {
    isLoading: isLoadingTopSeries,
    data: topSeries,
    refetch: refetchTopSeries,
  } = useQuery('top-Series', async () => {
    const response = await xoomBackendUrl.get('/api/series/top-series');
    return response.data;
  });
  return { topSeries, isLoadingTopSeries, refetchTopSeries };
}
