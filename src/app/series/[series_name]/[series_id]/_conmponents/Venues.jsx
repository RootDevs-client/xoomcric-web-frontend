'use client';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import VenueCardShimmer from './VenueCardShimmer';

export default function Venues({ series_id }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      //   const dynamicTabName =
      //     tabs.find((i) => i.id === activeTab).label.toLowerCase() ||
      //     'Recent'.toLowerCase();

      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/series/v1/${series_id}/venues`
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
    return [1, 2, 3]?.map((item) => <VenueCardShimmer key={item} />);
  }

  if (!result?.seriesVenue || result?.seriesVenue?.length == 0) {
    return <NoDataFound />;
  }

  return result?.seriesVenue?.map((venue) => (
    <VenueCard key={venue?.id} venue={venue} />
  ));
}
