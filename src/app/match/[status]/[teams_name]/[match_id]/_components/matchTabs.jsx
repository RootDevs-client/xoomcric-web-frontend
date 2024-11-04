'use client';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Commentary from './Commentary';
import MatchInfo from './MatchInfo';
import MatchLive from './MatchLive';
import ScoreCard from './ScoreCard';
import Squads from './Squads';

export default function MatchTabs({ match_id, status, teams_name, match }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const { userProfile, refetchProfile } = useGetUserProfile(session);

  const isFavorite =
    userProfile?.favorites?.matches.some(
      (item) => parseInt(item?.matchInfo?.matchId) == parseInt(match_id)
    ) || false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const handleFavoriteClick = async (event, match) => {
    console.log({ match });
    event.preventDefault();
    if (session) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (session?.user?.email?.role === 'admin') {
        toast.error('Please login as a user to add matches to favorites.');
        setIsStarClicked(false);
        return;
      }

      const favoriteData = {
        email: session?.user?.email,
        key: 'matches',
        item: { ...match, status, id: match.matchInfo?.matchId },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Match added to favorites');
        } else {
          setIsStarClicked(false);
          toast.error('Error');
        }
      } catch (error) {
        console.error('Error while adding to favorites:', error);
        toast.error('An error occurred');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  const handleRemoveFavorite = async (event, match) => {
    event.preventDefault();
    if (session) {
      setIsStarClicked(false);
      const favoriteData = {
        email: session?.user?.email,
        key: 'matches',
        item: { id: match.matchInfo?.matchId },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites/remove',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Match removed from favorites');
        } else {
          setIsStarClicked(true);
          toast.error('Failed to add match to favorites');
        }
      } catch (error) {
        console.error('Error while removing from favorites:', error);
        toast.error('Failed to add match to favorites');
      }
    } else {
      setIsStarClicked(true);
      toast.error('Please login first');
    }
  };

  let tabs = [];
  if (status === 'upcoming') {
    tabs = [
      {
        id: 1,
        label: 'Info',
      },
      {
        id: 2,
        label: 'Squads',
      },
    ];
  } else {
    tabs = [
      {
        id: 1,
        label: 'Live',
      },
      {
        id: 2,
        label: 'Info',
      },

      {
        id: 3,
        label: 'Scorecard',
      },
      {
        id: 4,
        label: 'Squads',
      },
      {
        id: 5,
        label: 'Commentary',
      },
    ];
  }

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5 py-3 border-b border-gray-200 bg-primary w-full -skew-y-[0.5deg]">
        <div className="flex items-center">
          <h1 className="font-semibold text-md text-white px-3 sm:text-3xl mb-5 capitalize">
            {teams_name
              ?.replace(/-/g, ' ')
              .replace(/(\d{4}) (\d{2})$/, '$1-$2')
              .toUpperCase()}
          </h1>
        </div>
        <div className="flex items-center">
          <div className="mr-3">
            <button
              onClick={(event) =>
                isStarClicked
                  ? handleRemoveFavorite(event, match)
                  : handleFavoriteClick(event, match)
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

      <div
        style={{}}
        className="flex justify-between items-center bg-black overflow-x-scroll match-scrollbar "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              router.push(`?id=${tab.id}`);
            }}
            className={`py-5 px-4 text-sm font-medium transition-colors w-full   h-full bg-black text-white ${
              tab?.id == activeTab && '!bg-[#FB0404]'
            } ${activeTab === 1 && 'tab-button-active-1'} ${
              (activeTab === 2 || activeTab === 3 || activeTab === 4) &&
              status !== 'upcoming' &&
              'tab-button-active-2'
            } ${activeTab === tabs?.length && 'tab-button-active-3'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {status === 'upcoming' ? (
          <>
            {activeTab === 1 && <MatchInfo match_id={match_id} />}
            {activeTab === 2 && <Squads match_id={match_id} />}
          </>
        ) : (
          <>
            {activeTab === 1 && <MatchLive match_id={match_id} />}
            {activeTab === 2 && <MatchInfo match_id={match_id} />}
            {activeTab === 3 && <ScoreCard match_id={match_id} />}
            {activeTab === 4 && <Squads match_id={match_id} />}
            {activeTab === 5 && <Commentary match_id={match_id} />}
          </>
        )}
      </div>
    </div>
  );
}
