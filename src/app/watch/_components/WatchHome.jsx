'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import NoDataFound from '@/components/Global/NoDataFound';
import TabItem from '@/components/Global/TabItem';
import TabPanel from '@/components/Global/TabPanel';
import useGetAllHighlight from '@/lib/hooks/admin/useGetAllHighlight';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import HighlightsTab from './HighlightsTab';

export default function WatchHome() {
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const { data: session } = useSession();

  const { highlights, highlightsLoading, highlightsRefetch } =
    useGetAllHighlight({
      session,
      page,
      limit,
    });

  if (highlightsLoading) {
    return <GlobalLoading />;
  }
  if (!highlights || highlights?.data?.length === 0) {
    return <NoDataFound />;
  }

  const tabs = ['Videos'];

  const tabContents = [
    // <LiveMatchTab key={'watch_tab_001'} liveMatches={allMatches} />,
    <HighlightsTab key={'watch_tab_001'} highlightsData={highlights?.data} />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleLoadMore = async () => {
    setIsLoadMore(true);
    setLimit((prev) => prev + 10);
    await highlightsRefetch();
    setIsLoadMore(false);
  };

  // console.log('highlights', highlights);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="bg-primary h-20 w-full -skew-y-[0.5deg] relative">
          <div className="bg-white text-primary z-30 w-fit ml-10 px-2 absolute -top-2 left-5 font-semibold uppercase shadow-md">
            <span className="">Watch</span>
          </div>
          <div className="skew-y-[0.5deg] grid grid-cols-12 items-center h-full p-2 px-5 mt-2 m-3 lg:m-0">
            {tabs.map((tab, index) => (
              <TabItem
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

        {highlights?.totalHighlight > highlights?.data?.length && (
          <div className="flex justify-center mb-5">
            <button
              onClick={handleLoadMore}
              className="btn btn-error btn-outline btn-sm rounded-md"
              disabled={isLoadMore}
            >
              {isLoadMore ? <ImSpinner className="ml-2 animate-spin" /> : ''}{' '}
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
