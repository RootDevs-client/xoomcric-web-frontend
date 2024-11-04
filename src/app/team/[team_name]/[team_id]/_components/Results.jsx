import ShimmerSheduleTable from '@/app/series/[series_name]/[series_id]/_conmponents/ShimmerSheduleTable';
import NoDataFound from '@/components/Global/NoDataFound';
import ScheduleTable from './ScheduleTable';

export default function Results({ teamInformation, loading }) {
  console.log(
    { teamInformation: teamInformation?.teamMatchesData, loading },
    'informatin'
  );

  if (loading) {
    return <ShimmerSheduleTable />;
  }

  return (
    <div className="sm:p-4">
      {teamInformation?.teamMatchesData?.length > 0 ? (
        teamInformation.teamMatchesData.map(
          (series) =>
            series?.matchDetailsMap?.match?.length > 0 && (
              <div key={series?.matchDetailsMap?.seriesId} className="mb-6">
                <h4 className="sm:text-xl text-base font-semibold mb-2">
                  {series?.matchDetailsMap?.key ||
                    'Series Information Not Available'}
                </h4>
                {series?.matchDetailsMap?.match && (
                  <ScheduleTable data={series?.matchDetailsMap?.match} />
                )}
              </div>
            )
        )
      ) : (
        <NoDataFound />
      )}
    </div>
  );
}
