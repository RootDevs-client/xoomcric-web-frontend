'use client';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { useEffect, useState } from 'react';
import About from './About';
import AboutShimmer from './AboutShimmer';
import Information from './Information';
import ShimmerInformation from './ShimmerInformation';
import ShimmerSummaryTable from './ShimmerSummaryTable';
import SummaryTable from './SummaryTable';

const tabs = [
  {
    id: 1,
    label: 'INFO',
  },
  {
    id: 2,
    label: 'BATTING',
  },
  {
    id: 3,
    label: 'BOWLING',
  },
  {
    id: 4,
    label: 'ABOUT',
  },
];

export default function PlayerTabs({ player_id }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [loading, setLoading] = useState(true);
  const [playerInformation, setPlayerInformation] = useState([]);
  async function getFixtures() {
    setLoading(true);
    try {
      //   const dynamicTabName =
      //     tabs.find((i) => i.id === activeTab).label.toLowerCase() ||
      //     'Recent'.toLowerCase();

      if (activeTab === 1) {
        const res = await xoomBackendUrl.post(
          `/cric-buzz/cricket/stats/v1/player/${player_id}`
        );
        console.log(res.data, 'inforatio');
        setPlayerInformation(res?.data?.data || {});
      }
      if (activeTab === 2) {
        const res = await xoomBackendUrl.post(
          `/cric-buzz/cricket/stats/v1/player/${player_id}/batting`
        );
        console.log(res.data, 'dattting');
        setPlayerInformation(res?.data?.data || {});
      }
      if (activeTab === 3) {
        const res = await xoomBackendUrl.post(
          `/cric-buzz/cricket/stats/v1/player/${player_id}/bowling`
        );
        console.log(res.data, 'bolling');
        setPlayerInformation(res?.data?.data || {});
      }
      if (activeTab === 4) {
        const res = await xoomBackendUrl.post(
          `/cric-buzz/cricket/stats/v1/player/${player_id}/career`
        );
        console.log(res.data, 'about');
        setPlayerInformation(res?.data?.data || {});
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
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-black ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setLoading(true);
            }}
            className={`py-5 px-4  text-sm font-medium transition-colors w-full   h-full bg-black text-white ${
              tab?.id == activeTab && '!bg-[#FB0404]'
            } ${activeTab === 1 && 'tab-button-active-1'} ${
              (activeTab === 2 || activeTab === 3) && 'tab-button-active-2'
            } ${activeTab === 4 && 'tab-button-active-3'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="mt-3 mb-2">
            {activeTab === 1 && <ShimmerInformation />}
            {(activeTab === 2 || activeTab === 3) && <ShimmerSummaryTable />}
            {activeTab === 4 && <AboutShimmer />}
          </div>
        ) : !playerInformation ||
          !playerInformation?.values ||
          playerInformation?.values?.length > 0 ? (
          <>
            {activeTab === 1 && (
              <Information playerInformation={playerInformation} />
            )}
            {activeTab === 2 && (
              <SummaryTable playerInformation={playerInformation} />
            )}
            {activeTab === 3 && (
              <SummaryTable playerInformation={playerInformation} />
            )}
            {activeTab === 4 && (
              <About playerInformation={playerInformation || {}} />
            )}
          </>
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
}
