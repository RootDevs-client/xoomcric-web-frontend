'use client';
import NoDataFound from '@/components/Global/NoDataFound';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiStar } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import MatchCardCricket from './MatchCardCricket';

const tabs = [
  {
    id: 1,
    label: 'Recent',
  },
  {
    id: 2,
    label: 'Live',
  },
  {
    id: 3,
    label: 'Upcoming',
  },
];

const Tabs = ({ session }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsTab = searchParams.get('tab');
  const activeTabCheck = tabs.find(
    (tab) => tab.label.toLowerCase() === paramsTab
  );

  const [activeTab, setActiveTab] = useState(
    activeTabCheck?.id ? activeTabCheck?.id : tabs[1].id
  );
  const [loading, setLoading] = useState(true);
  const [fixtures, setFixtures] = useState([]);

  async function getFixtures() {
    setLoading(true);
    try {
      const res = await xoomBackendUrl.post(
        `/api/admin/fixtures/cric-buzz/cricket`,
        {
          state:
            tabs.find((i) => i.id === activeTab).label.toLowerCase() ||
            'Recent'.toLowerCase(),
        },
        { headers: { Authorization: `Bearer ${session?.user?.accessToken}` } }
      );
      setFixtures(res?.data?.data || []);
    } catch (error) {
      console.error('Error fetching fixtures:', error);
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
              router.push(`?tab=${tab.label.toLowerCase()}`);
            }}
            className={`py-5 px-4  text-sm font-medium transition-colors w-full   h-full bg-black text-white ${
              tab?.id == activeTab && '!bg-[#FB0404]'
            } ${activeTab === 1 && 'tab-button-active-1'} ${
              activeTab === 2 && 'tab-button-active-2'
            } ${activeTab === 3 && 'tab-button-active-3'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="mt-3 mb-2">
            {arr.map((item) => (
              <div key={item} className="grid grid-cols-12 gap-5 mt-4">
                <div className="col-span-1 h-10 w-12 bg-[#F0F0F0] animate-pulse rounded-md"></div>
                <div className="col-span-4 h-10 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
                <div className="col-span-1 h-10 w-10 bg-[#F0F0F0] animate-pulse rounded-full m-auto"></div>
                <div className="col-span-4 h-10 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
                <div className="col-span-2 h-10 w-full animate-pulse rounded-md flex items-center justify-center">
                  <BiStar className="text-2xl text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        ) : fixtures?.length > 0 ? (
          <>
            {fixtures?.map((fixture, index) => (
              <div key={index} className="flex flex-col items-center">
                {fixture.seriesMatches.map((series) => {
                  return (
                    series?.seriesAdWrapper?.seriesName !== undefined && (
                      <>
                        <div
                          key={series.seriesId}
                          className="bg-white h-12 w-full -skew-y-[0.5deg]"
                        >
                          <div className="skew-y-[0.5deg] ">
                            <Link
                              className="flex items-center justify-between h-full p-2 px-4 hover:text-secondary"
                              href={`/series/${series?.seriesAdWrapper?.seriesName
                                .split(' ')
                                .join('-')
                                .replace(/,/g, '')
                                .replace(/[^\w-]+/g, '')}/${
                                series?.seriesAdWrapper?.seriesId
                              }`}
                            >
                              <h4 className="text-gray-900 text-[16px] font-semibold uppercase">
                                {series?.seriesAdWrapper?.seriesName}
                              </h4>
                              <FiChevronRight className="text-xl" />
                            </Link>
                          </div>
                        </div>
                        {series?.seriesAdWrapper?.matches?.map(
                          (match, index) => (
                            <MatchCardCricket
                              activeTab={activeTab}
                              key={index}
                              match={match}
                              status={tabs
                                ?.find((tab) => tab?.id === activeTab)
                                ?.label?.toLocaleLowerCase()}
                              //   refetchFixtures={refetchFixtures}
                            />
                          )
                        )}
                      </>
                    )
                  );
                })}
              </div>
            ))}
          </>
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  );
};

export default Tabs;
