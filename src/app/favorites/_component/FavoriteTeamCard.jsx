import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FavoriteTeamCard({ team, session }) {
  const { userProfile, refetchProfile } = useGetUserProfile(session);

  const favorite =
    userProfile?.favorites?.teams.some(
      (item) => parseInt(item.id) == parseInt(team.id)
    ) || false;

  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleRemoveFavorite = async (event, team) => {
    event.preventDefault();
    if (session) {
      setIsFavorite(false);
      const favoriteData = {
        email: session?.user?.email,
        key: 'teams',
        item: { id: team.id },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites/remove',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Team removed from favorites');
        } else {
          setIsFavorite(true);
          toast.error('Failed to add team to favorites');
        }
      } catch (error) {
        console.error('Error while removing from favorites:', error);
        toast.error('Failed to add team to favorites');
      }
    } else {
      setIsFavorite(true);
      toast.error('Please login first');
    }
  };

  return (
    <Link
      href={`/team/${team?.teamSName}/${team?.teamId}`}
      key={team.id}
      className="bg-base-100 h-auto w-full -skew-y-[0.5deg] mb-1"
    >
      <div className="skew-y-[0.5deg] bg-base-100 mb-2 p-5 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="">
            <img
              src={`https://static.cricbuzz.com/a/img/v1/i1/c${team.imageId}/cricket.jpg`}
              alt={team?.teamName}
              className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
            />
          </div>
          <div>
            <h2 className="font-bold">{team?.teamName}</h2>
            {/* <p className="text-gray-500 text-sm">{team.country}</p> */}
          </div>
        </div>
        <div>
          <button onClick={(event) => handleRemoveFavorite(event, team)}>
            <img
              src={
                isFavorite
                  ? '/icons/star_full_red.png'
                  : '/icons/star_black.png'
              }
              alt="Star logo"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
