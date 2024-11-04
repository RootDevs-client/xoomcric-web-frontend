import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllNews(session) {
  const {
    isLoading: allNewsLoading,
    data: allNews,
    refetch: allNewsRefetch,
  } = useQuery('admin-all-news', async () => {
    const response = await xoomBackendUrl.get(`/api/admin/news`, {
      headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
    });
    if (response.status === 200) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch all news data!');
    }
  });
  return { allNews, allNewsLoading, allNewsRefetch };
}
