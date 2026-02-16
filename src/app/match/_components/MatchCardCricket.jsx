import { useAuthStore } from '@/lib/auth-store';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import getSlugify from '@/lib/helpers/getSlugify';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import MatchStates from './MatchStates';

const MatchCardCricket = ({ match, large, status, activeTab }) => {
  const { token, isAdmin, user } = useAuthStore();
  const { userProfile, refetchProfile } = useGetUserProfile(
    token,
    isAdmin,
    user
  );

  const isFavorite =
    userProfile?.favorites?.matches.some(
      (item) =>
        parseInt(item?.matchInfo?.matchId) ===
        parseInt(match?.matchInfo?.matchId || 0)
    ) || false;

  const [isStarClicked, setIsStarClicked] = useState(isFavorite);

  useEffect(() => {
    if (userProfile) {
      setIsStarClicked(isFavorite);
    }
  }, [isFavorite, userProfile]);

  const upcomingStatus = [
    'TBA',
    'NS',
    'WO',
    'ABANDONED',
    'CANCELLED',
    'AWARDED',
    'INTERRUPTED',
    'POSTPONED',
  ];
  const isPreviewPage = upcomingStatus.includes(match?.state?.short_name);

  const handleFavoriteClick = async (event, match) => {
    event.preventDefault();
    if (user) {
      setIsStarClicked(true);

      // Check if the user is an admin
      if (isAdmin) {
        toast.error('Please login as a user to add matches to favorites.');
        setIsStarClicked(false);
        return;
      }

      const favoriteData = {
        phone: user?.phone,
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
    if (user) {
      setIsStarClicked(false);
      const favoriteData = {
        phone: user?.phone,
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

  const teamByLocation = (location) =>
    match?.participants?.find((team) => team?.meta?.location === location);

  return (
    <div className="relative w-full">
      <Link
        href={`/match/${status}/${getSlugify(
          match?.matchInfo?.team1?.teamName
        )}-vs-${getSlugify(match?.matchInfo?.team2?.teamName)}/${
          match.matchInfo?.matchId
        }`}
        className="w-full"
      >
        <div className="bg-base-100 h-auto w-full -skew-y-[0.5deg] mb-4">
          {/* <div className=" grid grid-cols-11 items-center gap-2 w-full border ">
            <div className="col-span-5">1</div>
            <div className="col-span-1 text-center">2</div>
            <div className="col-span-5 text-end">3</div>
          </div> */}
          <div
            className={`skew-y-[0.5deg] p-2 grid grid-cols-12 items-center gap-2 ${
              match?.matchInfo?.state == 'In Progress' && 'py-6'
            } ${large && 'p-5 px-10'}`}
          >
            <p className="col-span-2 sm:col-span-1 sm:text-start text-center text-gray-400 text-sm font-semibold">
              {match.matchInfo?.matchFormat}
            </p>
            <div className="col-span-3 sm:col-span-4 flex items-center">
              <img
                src={`https://static.cricbuzz.com/a/img/v1/50x30/i1/c${match?.matchInfo?.team1?.imageId}/cricket.jpg`}
                alt="team one"
                className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
              />
              <h4 className="text-sm font-semibold uppercase">
                {match.matchInfo?.team1?.teamSName}
              </h4>
            </div>
            {activeTab == 1 || activeTab == 2 ? (
              match?.matchInfo?.state == 'In Progress' ? (
                <div className="col-span-2   rounded-sm border border-red-300 px-2 py-1 flex flex-col text-xs text-gray-100 items-center justify-around mx-auto ">
                  <div className="text-red-500 text-xs font-bold flex items-center gap-1">
                    <span className="animate-pulse">●</span> Live
                  </div>
                </div>
              ) : (
                  match?.matchScore?.team1Score?.inngs2
                    ? match?.matchScore?.team1Score?.inngs2?.runs
                    : match?.matchScore?.team1Score?.inngs1?.runs &&
                        match?.matchScore?.team2Score?.inngs2
                      ? match?.matchScore?.team2Score?.inngs2?.runs
                      : match?.matchScore?.team2Score?.inngs1?.runs
                ) ? (
                <div className="col-span-2 w-14 h-14 p-1 sm:w-16 sm:h-16 bg-primary rounded-full flex flex-col text-xs text-gray-100 items-center justify-around mx-auto ">
                  <div className="h-1/2 flex items-center w-full ml-4 justify-start">
                    {match?.matchScore?.team1Score?.inngs2
                      ? match?.matchScore?.team1Score?.inngs2?.runs
                      : match?.matchScore?.team1Score?.inngs1?.runs || 0}{' '}
                  </div>{' '}
                  <div className="border w-full -rotate-[40deg] border-red-500"></div>
                  <div className="h-1/2 flex items-center w-full mr-4 justify-end">
                    {match?.matchScore?.team2Score?.inngs2
                      ? match?.matchScore?.team2Score?.inngs2?.runs
                      : match?.matchScore?.team2Score?.inngs1?.runs || 0}{' '}
                  </div>
                </div>
              ) : (
                <MatchStates match={match} />
              )
            ) : (
              <MatchStates match={match} />
            )}

            <div className="col-span-3 sm:col-span-4 flex items-center justify-end">
              <div className="flex items-center ">
                <h4 className="text-sm font-semibold uppercase">
                  {match.matchInfo?.team2?.teamSName}
                </h4>
                <img
                  src={`https://static.cricbuzz.com/a/img/v1/50x30/i1/c${match?.matchInfo?.team2?.imageId}/cricket.jpg`}
                  alt="team two"
                  className="w-7 h-7 ring-1 ring-primary ml-3  rounded-full"
                />
              </div>
            </div>
          </div>

          {match?.matchInfo?.state !== 'In Progress' && (
            <div
              className={`flex justify-center items-center pb-2 p-2 ${
                large && 'p-5 px-10'
              }`}
            >
              {match?.matchInfo?.status || ''}
            </div>
          )}
        </div>
      </Link>

      <div className={` mx-auto absolute top-6 right-5`}>
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
                : '/icons/star_black.png'
            }
            alt="Star logo"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default MatchCardCricket;
