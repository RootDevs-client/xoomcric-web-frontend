import Link from 'next/link';

export default function PlayerCard({ faceImageId, name, id, status }) {
  return (
    <>
      <Link
        href={`/player/${name}/${id}`}
        className="flex items-center gap-5 p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
      >
        <div>
          <img
            src={`https://static.cricbuzz.com/a/img/v1/i1/c${faceImageId}/cricket.jpg`}
            alt={name || 'Player'}
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{status}</p>
        </div>
      </Link>
    </>
  );
}
