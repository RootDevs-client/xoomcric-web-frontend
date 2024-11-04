import Global500Error from '@/components/Global/Global500Error';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import LiveMatchDetailsHome from './_components/LiveMatchDetailsHome';

export const metadata = {
  title: 'XoomCric | Live Match',
  description:
    'Watch live cricket matches and get real-time updates on scores, player performances, and match statistics. Stay connected with the action as it unfolds on the field.',
  keywords:
    'live cricket match, real-time scores, live updates, match statistics, cricket streaming, XoomCric',
};

async function fetchLiveMatch(id) {
  try {
    const { data } = await xoomBackendUrl.get(`/api/live-matches/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching live match:', error);
    return null;
  }
}

async function fetchAllLiveMatches() {
  try {
    const { data } = await xoomBackendUrl.get('/api/live-matches');
    return data?.data;
  } catch (error) {
    console.error('Error fetching all live matches:', error);
    return null;
  }
}

export default async function page({ params }) {
  const { live_id } = params;

  try {
    const matchData = await fetchLiveMatch(live_id);
    const allLiveMatches = await fetchAllLiveMatches();

    return (
      <LiveMatchDetailsHome
        matchData={matchData.data}
        allLiveMatches={allLiveMatches}
      />
    );
  } catch (error) {
    console.error('Error in page:', error);
    return (
      <>
        {' '}
        <Global500Error />
      </>
    );
  }
}
