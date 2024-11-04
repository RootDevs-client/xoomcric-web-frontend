export default function ShimmerSummaryTable() {
  return (
    <div className="animate-pulse">
      <table className="min-w-full">
        <tbody>
          {[...Array(10)].map((_, idx) => (
            <tr className="" key={idx}>
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
  );
}
