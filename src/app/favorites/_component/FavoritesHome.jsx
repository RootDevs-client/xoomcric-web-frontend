'use client';

import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import useGetUserProfile from '@/lib/hooks/useGetUserProfile';
import { useState } from 'react';
import FavoriteSeries from './FavoriteSeries';
import FavoritesMatches from './FavoritesMatches';
import FavoritesTeams from './FavoritesTeams';

const FavoriteTabItem = ({ tab, index, onClick, active, isWhite }) => (
  <TabItem
    key={index}
    tab={tab}
    onClick={onClick}
    active={active}
    isWhite={isWhite}
  />
);

export default function FavoritesHome({ session }) {
  const { userProfile, refetchProfile, userProfileLoading } =
    useGetUserProfile(session);
  const [currentTab, setCurrentTab] = useState(0);
  const [favoriteMatchesLoading, setFavoriteMatchesLoading] = useState(true);
  const [favoriteMatchesData, setFavoriteMatchesData] = useState([]);
  const [error, setError] = useState(null);

  const {
    series = [],
    matches = [],
    teams = [],
  } = userProfile?.favorites || {};

  // const fixtureIds = matches.map((item) => item.id);
  // const fetchData = async () => {
  //   try {
  //     if (fixtureIds.length > 0) {
  //       const response = await sportMonkUrl.get(
  //         `/fixtures/multi/${fixtureIds}?include=league.country;round.stage;participants;state;scores;periods`
  //       );
  //       if (response.status === 200) {
  //         setFavoriteMatchesData(response.data?.data);
  //       } else {
  //         throw new Error('Failed to fetch favorite matches data');
  //       }
  //     } else {
  //       setFavoriteMatchesData([]);
  //     }
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setFavoriteMatchesLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [userProfile]);

  const tabs = ['Matches', 'Teams', 'Series'];
  const tabContents = [
    <FavoritesMatches
      key={'favorites_tab_001'}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      session={session}
      userProfileLoading={userProfileLoading}
    />,
    <FavoritesTeams
      key={'favorites_tab_002'}
      teams={teams}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      session={session}
      userProfileLoading={userProfileLoading}
    />,
    <FavoriteSeries
      key={'favorites_tab_003'}
      series={series}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      session={session}
      userProfileLoading={userProfileLoading}
    />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-primary h-20 w-full -skew-y-[0.5deg] relative">
          <div className="skew-y-[0.5deg] flex gap-4 items-center h-full p-2 mt-2 mx-4 border-b-2 border-white">
            {tabs.map((tab, index) => (
              <FavoriteTabItem
                key={index}
                tab={tab}
                onClick={() => handleTabChange(index)}
                active={currentTab === index}
                isWhite={false}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white h-auto w-full">
        <div className="">
          {tabContents.map((content, index) => (
            <TabPanel
              key={index}
              content={content}
              index={index}
              currentTab={currentTab}
            />
          ))}
        </div>
      </div>
    </>
  );
}
