'use client';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PointTable from './PointTable';
import ScheduleAndResults from './ScheduleAndResults';
import Squads from './Squads';
import Venues from './Venues';

const tabs = [
  {
    id: 1,
    label: 'Schedule & Results',
  },
  {
    id: 2,
    label: ' Points Table',
  },
  {
    id: 3,
    label: 'Squads',
  },
  {
    id: 4,
    label: 'Venues',
  },
];

export default function SeriesTabs({ series_id, series_name, session }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const [currentTab, setCurrentTab] = useState(0);

  const { userProfile, refetchProfile } = useGetUserProfile(session);
  const isFavorite =
    userProfile?.favorites?.series?.some((item) => item?.id === series_id) ||
    false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const handleFavoriteClick = async (event, seriesData) => {
    event.preventDefault();

    if (session) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (session?.user?.email?.role === 'admin') {
        toast.error('Please log in as a user to add leagues to favorite.');
        setIsStarClicked(false);
        return;
      }

      const favoriteData = {
        email: session?.user?.email,
        key: 'series',
        item: {
          id: seriesData.series_id,
          name: seriesData.series_name,
          // image: leagueData.image_path,
          // country: leagueData?.country?.name,
        },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Series added to favorites');
        } else {
          setIsStarClicked(false);
          toast.error('Failed to add Series to favorites');
        }
      } catch (error) {
        console.error('Error while adding Series to favorites:', error);
        setIsStarClicked(false);
        toast.error('An error occurred while adding Series to favorites');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  const handleRemoveFavorite = async (event, seriesData) => {
    event.preventDefault();

    if (session) {
      setIsStarClicked(false);
      const favoriteData = {
        email: session?.user?.email,
        key: 'series',
        item: {
          id: seriesData.series_id,
          name: seriesData.series_name,
          // image: seriesData.image_path,
        },
      };

      const { data } = await xoomBackendUrl.put(
        '/api/user/favorites/remove',
        favoriteData
      );

      if (data.status) {
        refetchProfile();
        toast.success('Series removed from favorite');
      } else {
        setIsStarClicked(false);
        toast.error('Failed to remove Series from favorite');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5 py-3 border-b border-gray-200 bg-primary w-full -skew-y-[0.5deg]">
        <div className="flex items-center">
          <h1 className="font-semibold text-md text-white px-3 sm:text-3xl mb-5 capitalize">
            {series_name
              ?.replace(/-/g, ' ')
              .replace(/(\d{4}) (\d{2})$/, '$1-$2')}
          </h1>
        </div>
        <div className="flex items-center">
          <div className="mr-3">
            <button
              onClick={(event) =>
                isStarClicked
                  ? handleRemoveFavorite(event, { series_id, series_name })
                  : handleFavoriteClick(event, { series_id, series_name })
              }
            >
              <img
                src={
                  isStarClicked
                    ? '/icons/star_full_red.png'
                    : '/icons/star_white.png'
                }
                alt="Star logo"
                width={20}
                height={20}
                className=""
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-black -skew-y-[0.5deg]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
            }}
            className={`sm:py-5 sm:px-4 py-1 px-1 text-sm font-medium transition-colors w-full   h-full bg-black text-white ${
              tab?.id == activeTab && '!bg-[#FB0404]'
            } ${activeTab === 1 && 'tab-button-active-1'} ${
              (activeTab === 2 || activeTab === 3) && 'tab-button-active-2'
            } ${activeTab === 4 && 'tab-button-active-3'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 -skew-y-[0.5deg]">
        {activeTab === 1 && <ScheduleAndResults series_id={series_id} />}
        {activeTab === 2 && <PointTable series_id={series_id} />}
        {activeTab === 3 && <Squads series_id={series_id} />}
        {activeTab === 4 && <Venues series_id={series_id} />}
      </div>
    </div>
  );
}
