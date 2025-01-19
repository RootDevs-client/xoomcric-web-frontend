'use client';

import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import { useAuthStore } from '@/lib/auth-store';
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

export default function FavoritesHome() {
  const { token, isAdmin, user } = useAuthStore();

  const { userProfile, userProfileLoading } = useGetUserProfile(
    token,
    isAdmin,
    user
  );
  const [currentTab, setCurrentTab] = useState(0);

  const {
    series = [],
    matches = [],
    teams = [],
  } = userProfile?.favorites || {};

  const tabs = ['Matches', 'Teams', 'Series'];
  const tabContents = [
    <FavoritesMatches
      key={'favorites_tab_001'}
      matches={matches}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      userProfileLoading={userProfileLoading}
    />,
    <FavoritesTeams
      key={'favorites_tab_002'}
      teams={teams}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
      userProfileLoading={userProfileLoading}
    />,
    <FavoriteSeries
      key={'favorites_tab_003'}
      series={series}
      userProfile={userProfile}
      notLoggedIn={!userProfile}
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
