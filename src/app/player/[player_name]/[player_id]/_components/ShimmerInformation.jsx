export default function ShimmerInformation() {
  return (
    <div className="animate-pulse mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="flex flex-col items-center bg-gray-800 text-white py-6">
        <div className="w-24 h-24 rounded-full bg-gray-300"></div>

        {/* Name Placeholder */}
        <div className="h-4 w-1/3 bg-gray-300 mt-4 rounded"></div>

        {/* Role and Date of Birth Placeholder */}
        <div className="h-3 w-1/4 bg-gray-400 mt-2 rounded"></div>
        <div className="h-3 w-1/4 bg-gray-400 mt-1 rounded"></div>
      </div>

      {/* ICC Rankings Table Placeholder */}
      <div className="px-6 py-4">
        <div className="h-5 w-1/2 bg-gray-300 rounded mb-4 mx-auto"></div>
        <table className="w-full bg-gray-50 rounded-lg shadow">
          <thead>
            <tr className="text-left bg-gray-100 text-gray-700 font-semibold">
              <th className="px-4 py-2">Format</th>
              <th className="px-4 py-2">T20</th>
              <th className="px-4 py-2">ODI</th>
              <th className="px-4 py-2">TEST</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, idx) => (
              <tr className="border-t" key={idx}>
                <td className="px-4 py-2">
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Teams Played In Placeholder */}
      <div className="px-6 py-4">
        <div className="h-5 w-1/2 bg-gray-300 rounded mb-4 mx-auto"></div>
        <div className="h-3 w-full bg-gray-300 rounded mb-1"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded mb-1"></div>
        <div className="h-3 w-4/5 bg-gray-300 rounded"></div>
      </div>

      {/* About Section Placeholder */}
      <div className="px-6 py-4">
        <div className="h-5 w-1/2 bg-gray-300 rounded mb-4 mx-auto"></div>
        <div className="h-3 w-full bg-gray-300 rounded mb-1"></div>
        <div className="h-3 w-4/5 bg-gray-300 rounded mb-1"></div>
        <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}
