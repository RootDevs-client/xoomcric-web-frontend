import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useQuery } from 'react-query';

export default function useGetAllPlayer() {
  const {
    isLoading: isLoadingAllPlayer,
    data: allPlayersData,
    refetch: refetchAllPlayers,
  } = useQuery('all-Players', async () => {
    const response = await xoomBackendUrl.get('/api/player/trending');

    return response.data;
  });
  return { allPlayersData, isLoadingAllPlayer, refetchAllPlayers };
}
