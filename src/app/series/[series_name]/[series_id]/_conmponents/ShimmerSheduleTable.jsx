export default function ShimmerSheduleTable() {
  return (
    <div className="animate-pulse">
      <div className=" mx-auto bg-white overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Match Details</th>
              <th className="py-3 px-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {[...Array(3)].map((_, idx) => (
              <tr className="border-t" key={idx}>
                <td className="px-4 py-2">
                  <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-1/3 my-2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/3 my-2 bg-gray-300 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-1/4 my-2 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
