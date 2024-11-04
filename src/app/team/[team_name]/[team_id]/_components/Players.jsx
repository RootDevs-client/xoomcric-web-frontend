import NoDataFound from '@/components/Global/NoDataFound';
import Image from 'next/image';
import Link from 'next/link';

export default function Players({ teamInformation, loading }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border border-gray-200 bg-slate-300 rounded-lg"
            >
              <div className="h-20 w-20 bg-gray-100 rounded-full shimmer mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4 shimmer mb-1"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2 shimmer"></div>
            </div>
          ))
        ) : !teamInformation?.player ||
          teamInformation?.player?.length === 0 ? (
          <NoDataFound />
        ) : (
          teamInformation?.player?.map((player) =>
            player.name && (player.battingStyle || player.bowlingStyle) ? (
              <Link
                key={player.id || player.name}
                href={`/player/${player.name}/${player.id}`}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
              >
                <Image
                  width={500}
                  height={500}
                  src={`https://static.cricbuzz.com/a/img/v1/i1/c${player.imageId}/cricket.jpg`}
                  alt={player.name || 'Player'}
                  className="h-20 w-20 object-cover mb-2 rounded-full"
                  loading="lazy"
                />
                <span className="text-center text-lg font-medium">
                  {player.name || 'Unknown Player'}
                </span>
                {player.battingStyle && (
                  <span className="text-center text-sm text-gray-600">
                    <span className="font-bold">Batting</span> (
                    {player.battingStyle})
                  </span>
                )}
                {player.bowlingStyle && (
                  <span className="text-center text-sm text-gray-600">
                    <span className="font-bold">Bowling</span> (
                    {player.bowlingStyle})
                  </span>
                )}
              </Link>
            ) : (
              <div
                key={player.id || player.name}
                className="col-span-1 sm:col-span-2 lg:col-span-3"
              >
                <h3 className="text-2xl font-bold">
                  {player.name || 'Unknown Player'}
                </h3>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
