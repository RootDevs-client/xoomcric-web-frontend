import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetUserProfile(session) {
  const {
    isLoading: userProfileLoading,
    data: userProfile,
    refetch: refetchProfile,
  } = useQuery(
    'user-profile',
    async () => {
      // Check if session is available before making the API call

      const userRole = session?.user?.role;
      const apiEndpoint =
        userRole === 'admin' ? '/api/admin/profile' : '/api/user/profile';

      const response = await xoomBackendUrl.post(
        apiEndpoint,
        {
          email: session?.user?.email,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data?.data;
      } else {
        throw new Error('Failed to fetch user profile data!');
      }
    },
    {
      enabled: !!session,
    }
  );

  return { userProfile, userProfileLoading, refetchProfile };
}
