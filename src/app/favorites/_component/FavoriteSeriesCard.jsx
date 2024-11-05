import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function FavoriteSeriesCard({ seriesItem, session }) {
  const { userProfile, refetchProfile } = useGetUserProfile(session);

  const favorite =
    userProfile?.favorites?.series.some(
      (item) => parseInt(item?.id) === parseInt(seriesItem?.id)
    ) || false;

  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleRemoveFavorite = async (event, series) => {
    event.preventDefault();

    setIsFavorite(false);
    const favoriteData = {
      email: session?.user?.email,
      key: 'series',
      item: { id: series?.id },
    };

    try {
      const { data } = await xoomBackendUrl.put(
        '/api/user/favorites/remove',
        favoriteData
      );

      if (data?.status) {
        refetchProfile();
        toast.success('series removed from favorites');
      } else {
        setIsFavorite(true);
        toast.error('Failed to add series to favorites');
      }
    } catch (error) {
      console.error('Error while removing from favorites:', error);
      toast.error('Failed to add series to favorites');
    }
  };

  return (
    <Link
      href={`/series/${seriesItem?.name?.split(' ')?.join('-')}/${
        seriesItem?.id
      }`}
      className="bg-base-100 h-auto w-full -skew-y-[0.5deg] mb-1"
    >
      <div className="skew-y-[0.5deg] bg-base-100 mb-2 p-5 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {/* <div className="">
            <img
              src={series?.image}
              alt={series?.name}
              className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
            />
          </div> */}
          <div>
            <h2 className="font-bold capitalize">
              {seriesItem?.name?.split('-')?.join(' ')}{' '}
            </h2>
            {/* <p className="text-gray-500 text-sm">{seriesItem.country}</p> */}
          </div>
        </div>
        <div>
          <button onClick={(event) => handleRemoveFavorite(event, seriesItem)}>
            <img
              src={
                isFavorite
                  ? '/icons/star_full_red.png'
                  : '/icons/star_black.png'
              }
              alt="Star logo"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </Link>
  );
}
