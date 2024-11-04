export default function Information({ playerInformation }) {
  return (
    <>
      <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center bg-black text-white py-6">
          <img
            src={`https://static.cricbuzz.com/a/img/v1/i1/c${playerInformation?.faceImageId}/cricket.jpg`}
            alt={playerInformation?.name}
            className="w-24 h-24 rounded-full border-4 border-gray-100"
          />
          <h2 className="text-2xl font-semibold mt-4">
            {playerInformation?.name}
          </h2>
          <p className="text-gray-300">
            {playerInformation?.role} ({playerInformation?.bat})
          </p>
          <p className="text-gray-400">{playerInformation?.DoB}</p>
        </div>

        {/* ICC Rankings */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-semibold mb-2 text-center">
            ICC Rankings
          </h3>
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
              <tr className="border-t">
                <td className="px-4 py-2">Batting</td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.bat?.t20BestRank || '-'}
                </td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.bat?.odiBestRank || '-'}
                </td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.bat?.testRank || '-'}
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">Bowling</td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.bowl?.t20BestRank || '-'}
                </td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.bowl?.odiBestRank || '-'}
                </td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.bowl?.testBestRank || '-'}
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2">All Rounder</td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.all?.t20BestRank || '-'}
                </td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.all?.odiBestRank || '-'}
                </td>
                <td className="px-4 py-2">
                  {playerInformation?.rankings?.all?.testBestRank || '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Teams Played In */}
        {playerInformation?.teams && (
          <div className="px-6 py-4">
            <h3 className="text-xl font-semibold text-center mb-2">
              Teams Played In
            </h3>
            <p className="text-gray-600 text-sm">{playerInformation?.teams}</p>
          </div>
        )}
        {/* About Section */}
        {playerInformation?.bio && (
          <div className="px-6 py-4">
            <h3 className="text-xl font-semibold text-center mb-2">About</h3>
            <p
              className="text-gray-700 text-sm"
              dangerouslySetInnerHTML={{ __html: playerInformation?.bio }}
            ></p>
          </div>
        )}
      </div>
    </>
  );
}
