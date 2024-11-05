'use client';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import SheduleTable from './SheduleTable';
import ShimmerSheduleTable from './ShimmerSheduleTable';

export default function ScheduleAndResults({ series_id }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/series/v1/${series_id}`
      );

      setResult(res?.data?.data || {});
    } catch (error) {
      console.error('Error fetching schedule Information:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <ShimmerSheduleTable />;
  }

  if (!result?.matchDetails || result?.matchDetails?.length == 0) {
    return <NoDataFound />;
  }

  return <SheduleTable data={result?.matchDetails} />;
}
