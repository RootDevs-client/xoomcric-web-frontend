import Link from 'next/link';
import { BiSolidCricketBall } from 'react-icons/bi';
import { GiCricketBat } from 'react-icons/gi';

export default function PlayerList({ players, PlayerIsloading }) {
  const groupedData = players.reduce((acc, item) => {
    if (!item.id) {
      acc.push({ category: item.name, players: [] });
    } else {
      acc[acc.length - 1].players.push(item);
    }
    return acc;
  }, []);
  if (PlayerIsloading) {
    return (
      <div className="pt-0 space-y-8 w-full">
        {/* Shimmer effect for each category header */}
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <div className="h-8 bg-gray-800 animate-pulse mb-4 p-4 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Shimmer effect for player cards */}
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-gray-200 animate-pulse"
                >
                  <div className="w-16 h-16 rounded-full bg-gray-300" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2" />
                    <div className="h-3 bg-gray-300 rounded mb-2 w-3/4" />
                    <div className="h-3 bg-gray-300 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className=" pt-0 space-y-8 w-full">
      {groupedData.map((section, index) => (
        <div key={index}>
          <h2 className="text-xl font-bold mb-4 bg-gray-800 text-white p-4">
            {section.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm"
              >
                <img
                  src={`https://static.cricbuzz.com/a/img/v1/i1/c${player?.imageId}/cricket.jpg`}
                  alt={player.name}
                  className="w-16 h-16 rounded-full bg-gray-300"
                />
                <div>
                  <Link
                    href={`/player/${player?.name}/${player?.id}`}
                    className="text-lg font-semibold text-gray-800"
                  >
                    {player.name}
                  </Link>
                  <div className="text-gray-600 flex justify-start items-center gap-2">
                    <span className="font-medium rotate-90">
                      <GiCricketBat />
                    </span>{' '}
                    {player.battingStyle}
                  </div>
                  {player.bowlingStyle && (
                    <div className="text-gray-600 flex justify-start items-center gap-2">
                      <span className="font-medium">
                        <BiSolidCricketBall />
                      </span>{' '}
                      {player.bowlingStyle}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
