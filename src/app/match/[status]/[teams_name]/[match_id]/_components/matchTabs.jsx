'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Commentary from './Commentary';
import MatchInfo from './MatchInfo';
import MatchLive from './MatchLive';
import ScoreCard from './ScoreCard';
import Squads from './Squads';

export default function MatchTabs({ match_id, status }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const id = searchParams?.get('id');

  // useEffect(() => {
  //   if (id) {
  //     setActiveTab(id);
  //   }
  // }, [id]);

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  console.log({ activeTab, length: tabs.length });

  return (
    <div className="w-full">
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
