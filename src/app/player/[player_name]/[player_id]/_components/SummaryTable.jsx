export default function SummaryTable({ playerInformation }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            {playerInformation?.headers?.map((header, index) => (
              <th key={index} className="sm:px-4 sm:py-2 py-1 px-2  text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {playerInformation?.values?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
            >
              {row?.values?.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="sm:px-4 sm:py-2 py-1 px-2 text-start"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
