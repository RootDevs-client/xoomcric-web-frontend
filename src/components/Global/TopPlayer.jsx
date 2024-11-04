import getSlugify from '@/lib/helpers/getSlugify';
import Link from 'next/link';

export default function TopPlayer({ player }) {
  return (
    <div className="">
      <Link
        href={`/player/${getSlugify(player?.name)}/${player?.id}`}
        className="flex items-center"
      >
        <img
          src={`https://static.cricbuzz.com/a/img/v1/i1/c${player?.faceImageId}/cricket.jpg`}
          alt={player?.name}
          className="w-7 h-7 ring-1 ring-primary mr-4 rounded-full"
        />
        <p className="text-black font-semibold text-[1rem] uppercase">
          {player?.name}
        </p>
      </Link>
    </div>
  );
}
