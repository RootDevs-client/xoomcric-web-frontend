import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllUsers(
  token,
  { page = 1, limit = 10, search = '' } = {}
) {
  const {
    isLoading: allUsersLoading,
    data,
    refetch: allUsersRefetch,
  } = useQuery(
    ['admin-all-users', page, limit, search],
    async () => {
      const response = await xoomBackendUrl.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
          search,
        },
      });

      if (response.status === 200) {
        return response.data;
      }

      throw new Error('Failed to fetch users');
    },
    {
      keepPreviousData: true,
      enabled: !!token,
    }
  );

  return {
    allUsers: data?.data || [],
    pagination: data?.pagination || {
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      pageSize: limit,
    },
    allUsersLoading,
    allUsersRefetch,
  };
}
