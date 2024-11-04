import ShimmerSheduleTable from '@/app/series/[series_name]/[series_id]/_conmponents/ShimmerSheduleTable';
import NoDataFound from '@/components/Global/NoDataFound';
import ScheduleTable from './ScheduleTable';

export default function Schedule({ data, loading }) {
  if (loading) {
    return <ShimmerSheduleTable />;
  }
  if (!data || data?.length === 0) {
    return <NoDataFound />;
  }
  return (
    <>
      {data?.map((item, index) => {
        return (
          <div key={index}>
            {item?.matchDetailsMap?.key && (
              <h4 className="text-xl font-semibold mt-5 mb-3">
                {item?.matchDetailsMap?.key || 'Team Information Not Available'}
              </h4>
            )}

            {item?.matchDetailsMap?.match && (
              <ScheduleTable data={item?.matchDetailsMap?.match} />
            )}
          </div>
        );
      })}
    </>
  );
}
