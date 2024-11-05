'use client';
import { xoomBackendUrl } from '@/lib/axios/getAxios';

import NoDataFound from '@/components/Global/NoDataFound';
import { useEffect, useState } from 'react';
import PointTableCard from './PointTableCard';
import PointTableCardShimmer from './PointTableCardShimmer';

export default function PointTable({ series_id }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/cric-buzz/cricket/stats/v1/series/${series_id}/points-table`
      );

      setResult(res?.data?.data || {});
    } catch (error) {
      console.error('Error fetching Point Table Information:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <PointTableCardShimmer />;
  }
  if (!result?.pointsTable || result?.pointsTable?.length == 0) {
    return <NoDataFound />;
  }

  return (
    <>
      <div className="container mx-auto grid gap-4 overflow-x-scroll">
        {result?.pointsTable?.map((pointsTable, index) => (
          <PointTableCard key={index} pointsTable={pointsTable} />
        ))}
      </div>
    </>
  );
}
