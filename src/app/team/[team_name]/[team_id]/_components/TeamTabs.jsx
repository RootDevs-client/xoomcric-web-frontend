'use client';
import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Players from './Players';
import Results from './Results';
import Schedule from './Schedule';

const tabs = [
  {
    id: 1,
    label: 'Results',
  },
  {
    id: 2,
    label: 'Schedule',
  },

  {
    id: 3,
    label: 'Players',
  },
];
export default function TeamTabs({ team_id, team_name, teamList }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [loading, setLoading] = useState(true);
  const [teamInformation, setTeamInformation] = useState([]);
  const { token, isAdmin, user } = useAuthStore();

  const { userProfile, refetchProfile } = useGetUserProfile(
    token,
    isAdmin,
    user
  );
  const isFavorite =
    userProfile?.favorites?.teams?.some((item) => item?.id == team_id) || false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  const teamDetails = teamList?.find((team) => team?.teamId == team_id);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const handleFavoriteClick = async (event) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (isAdmin) {
        toast.error('Please log in as a user to add leagues to favorite.');
        setIsStarClicked(false);
        return;
      }

      const favoriteData = {
        phone: user?.phone,
        key: 'teams',
        item: {
          id: teamDetails?.teamId || team_id,
          ...(teamDetails || {
            teamId: team_id,
            teamSName: team_name,
            teamName: team_name,
          }),
        },
      };

      try {
        const { data } = await xoomBackendUrl.put(
          '/api/user/favorites',
          favoriteData
        );

        if (data.status) {
          refetchProfile();
          toast.success('Team added to favorites');
        } else {
          setIsStarClicked(false);
          toast.error('Failed to add Team to favorites');
        }
      } catch (error) {
        console.error('Error while adding Team to favorites:', error);
        setIsStarClicked(false);
        toast.error('An error occurred while adding Team to favorites');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  const handleRemoveFavorite = async (event) => {
    event.preventDefault();

    if (user) {
      setIsStarClicked(false);
      const favoriteData = {
        phone: user?.phone,
        key: 'teams',
        item: {
          id: teamDetails?.teamId || team_id,
          ...(teamDetails || {
            teamId: team_id,
            teamName: team_name,
            teamSName: team_name,
          }),
        },
      };

      const { data } = await xoomBackendUrl.put(
        '/api/user/favorites/remove',
        favoriteData
      );

      if (data.status) {
        refetchProfile();
        toast.success('Team removed from favorite');
      } else {
        setIsStarClicked(false);
        toast.error('Failed to remove Team from favorite');
      }
    } else {
      setIsStarClicked(false);
      toast.error('Please login first');
    }
  };

  async function getFixtures() {
    setLoading(true);
    try {
      if (activeTab === 2) {
        const res = await xoomBackendUrl.post(
          `/cric-buzz/cricket/teams/v1/${team_id}/schedule`
        );

        setTeamInformation(res?.data?.data || {});
      }
      if (activeTab === 1) {
        const res = await xoomBackendUrl.post(
          `/cric-buzz/cricket/teams/v1/${team_id}/results`
        );

        setTeamInformation(res?.data?.data || {});
      }
      if (activeTab === 3) {
        const res = await xoomBackendUrl.post(
          `/cric-buzz/cricket/teams/v1/${team_id}/players`
        );

        setTeamInformation(res?.data?.data || {});
      }
    } catch (error) {
      console.error('Error fetching player Information:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFixtures();
  }, [activeTab]);

  const id = searchParams?.get('id');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5 py-3 border-b border-gray-200 bg-primary w-full -skew-y-[0.5deg]">
        <div className="flex items-center justify-center pl-4 gap-4">
          {teamDetails?.imageId && (
            <Image
              width={100}
              height={100}
              src={`https://static.cricbuzz.com/a/img/v1/i1/c${
                teamDetails?.imageId || team_id
              }/cricket.jpg`}
              alt={teamDetails?.name || 'Player'}
              className="h-10 w-10 object-cover mb-2 rounded-full"
              loading="lazy"
            />
          )}
          <div className="font-semibold text-md text-white  sm:text-3xl ">
            {teamDetails?.teamName ||
              team_name
                ?.replace(/-/g, ' ')
                .replace(/(\d{4}) (\d{2})$/, '$1-$2')}
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3">
            <button
              onClick={(event) =>
                isStarClicked
                  ? handleRemoveFavorite(event)
                  : handleFavoriteClick(event)
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

      <div className="flex justify-between items-center bg-black ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              router.push(`?id=${tab.id}`);
            }}
            className={`py-5 px-4  text-sm font-medium transition-colors w-full   h-full bg-black text-white ${
              tab?.id == activeTab && '!bg-[#FB0404]'
            } ${activeTab === 1 && 'tab-button-active-1'} ${
              activeTab === 2 && 'tab-button-active-2'
            } ${activeTab === tabs?.length && 'tab-button-active-3'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <>
          {activeTab === 1 && (
            <Results teamInformation={teamInformation} loading={loading} />
          )}
          {activeTab === 2 && (
            <Schedule
              data={teamInformation?.teamMatchesData}
              loading={loading}
            />
          )}
          {activeTab === 3 && (
            <Players teamInformation={teamInformation} loading={loading} />
          )}
        </>
      </div>
    </div>
  );
}
