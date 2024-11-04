import React from 'react';

export default function PointTableCardShimmer() {
  const shimmerRows = Array.from({ length: 5 }, (_, i) => i); // Array to render multiple shimmer rows

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded shadow-md animate-pulse">
      <thead>
        <tr className="bg-gray-200 text-gray-300 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left w-1/4">Group Name</th>
          <th className="py-3 px-6 text-left w-1/8">Mat</th>
          <th className="py-3 px-6 text-left w-1/8">Won</th>
          <th className="py-3 px-6 text-left w-1/8">Lost</th>
          <th className="py-3 px-6 text-left w-1/8">Tied</th>
          <th className="py-3 px-6 text-left w-1/8">Points</th>
          <th className="py-3 px-6 text-left w-1/8">NRR</th>
          <th className="py-3 px-6 text-left w-1/8"></th>
        </tr>
      </thead>
      <tbody className="text-gray-300 text-sm font-light">
        {shimmerRows.map((_, index) => (
          <React.Fragment key={index}>
            <tr className="border-b hover:bg-gray-100 cursor-pointer">
              <td className="py-3 px-6 w-1/4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </td>
              <td className="py-3 px-6 w-1/8">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-3 px-6 w-1/8">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-3 px-6 w-1/8">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-3 px-6 w-1/8">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-3 px-6 w-1/8">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-3 px-6 w-1/8">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="py-3 px-6 w-1/8">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </td>
            </tr>

            {/* Expanded row shimmer */}
            {/* <tr>
              <td colSpan={8} className="bg-gray-100 py-2">
                <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
                  <thead>
                    <tr className="bg-gray-200 text-gray-300 uppercase text-sm leading-normal">
                      <th className="py-2 px-4 text-left w-1/4">Opponent</th>
                      <th className="py-2 px-4 text-left w-1/4">Description</th>
                      <th className="py-2 px-4 text-left w-1/4">Date</th>
                      <th className="py-2 px-4 text-left w-1/4">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 px-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </td>
                        <td className="py-2 px-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </td>
                        <td className="py-2 px-4">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </td>
                        <td className="py-2 px-4">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr> */}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
