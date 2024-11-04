const moment = require('moment');
export default function ScheduleTable({ data }) {
  return (
    <div className="">
      <div className="mx-auto bg-white overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Match Details</th>
              <th className="py-3 px-4">Time</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {data?.map((item, index) => {
              const matchInfo = item?.matchInfo;
              const startDate = new Date(parseInt(matchInfo.startDate));
              const formattedDate = startDate?.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                weekday: 'short',
              });
              const formattedTime = startDate?.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              });
              const gmtTime = moment?.utc(startDate)?.format('h:mm A');

              const localTimeWithOffset = moment
                ?.utc(startDate)
                ?.utcOffset(matchInfo?.venueInfo?.timezone)
                ?.format('h:mm A');

              const localTime = moment(startDate)?.format('h:mm A');
              console.log(matchInfo, 'matchInfo');

              return (
                <tr key={index} className="border-b">
                  <td className="sm:py-4 py-1 sm:px-4 px-1 text-gray-900 font-medium">
                    {formattedDate}
                  </td>
                  <td className="sm:py-4 py-1 sm:px-4 px-1">
                    <div>
                      {matchInfo?.team1?.teamName} vs {matchInfo.team2.teamName}
                      , {matchInfo?.matchDesc}
                    </div>
                    <div>
                      {matchInfo?.venueInfo?.ground},{' '}
                      {matchInfo?.venueInfo?.city}
                    </div>
                    {matchInfo?.state === 'Complete' ? (
                      <div className="text-gray-800">
                        {matchInfo?.status || 'Status Not Available'}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Match starts at {formattedDate}, {formattedTime} GMT
                      </div>
                    )}
                  </td>
                  <td className="sm:py-4 py-1 sm:px-4 px-1 text-gray-900 font-medium">
                    <div>{localTime}</div>
                    <div className="text-sm text-gray-500">
                      {gmtTime} GMT / {localTimeWithOffset} LOCAL
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
