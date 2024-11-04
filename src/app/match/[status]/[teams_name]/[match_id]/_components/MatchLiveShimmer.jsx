export default function MatchLiveShimmer() {
  return (
    <div className="w-full p-4 space-y-6">
      <div className="bg-white rounded-lg p-4 animate-pulse">
        <div className="flex justify-center gap-6 items-center mb-5">
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
          <div className="w-12 h-6 bg-gray-300 rounded"></div>
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>
        <table className="w-full border border-gray-300 mb-5">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </th>
              <th className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="w-6 h-4 bg-gray-300 rounded"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
