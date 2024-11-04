'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { xoomBackendUrl } from '@/lib/axios/getAxios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGear } from 'react-icons/fa6';
import CricketFixtureList from './CricketFixtureList';

export default function CricBuzzFixtureContainer({ session }) {
  const [loading, setLoading] = useState(true);
  const [fixtures, setFixtures] = useState([]);
  const [fixtureState, setFixtureState] = useState('live');
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  // const { userToken } = useAuthContext();

  useEffect(() => {
    async function setTimeZone() {
      try {
        const { data } = await xoomBackendUrl.get(
          '/api/admin/administration-settings',
          {
            headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
          }
        );
        const timeZone = data?.data?.timezone?.value;
        if (!timeZone) {
          showTimeZoneWarning();
        } else {
          setOffset(timeZone); // Ensure setOffset is defined or imported
        }
      } catch (error) {
        console.error('Error setting timezone:', error);
      }
    }

    async function getFixtures() {
      setLoading(true);
      try {
        const res = await xoomBackendUrl.post(
          `/api/admin/fixtures/cric-buzz/cricket`,
          { state: fixtureState },
          { headers: { Authorization: `Bearer ${session?.user?.accessToken}` } }
        );
        setFixtures(res?.data?.data || []);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      } finally {
        setLoading(false);
      }
    }

    function showTimeZoneWarning() {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
        >
          <div className="w-0 flex-1 p-4">
            <div className="flex items-center">
              <div className="flex flex-col items-center gap-1 border-r border-gray-300 p-1">
                <FaGear className="text-2xl text-orange-500" />
                <h4 className="text-lg font-medium text-orange-400">Warning</h4>
              </div>
              <p className="p-2 text-xs text-gray-500">
                <span className="font-semibold">
                  General Settings is empty.
                </span>
                <br /> Please set your preferred timezone in general settings
                before creating a match
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between border-l border-gray-200 p-4">
            <Link
              className="btn btn-success btn-outline btn-sm w-full rounded-md"
              href="/xoomadmin/general-settings"
            >
              Set Now
            </Link>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-error btn-outline btn-sm w-full rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }

    setTimeZone();
    getFixtures();
  }, [session?.user?.accessToken, fixtureState]);

  const tabClasses = (state) =>
    `btn h-[45px] btn-sm btn-primary min-w-[170px] rounded-md ${
      fixtureState === state ? 'btn-primary' : 'btn-outline'
    }`;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFixtures = fixtures
    .map((fixture) => ({
      ...fixture,
      seriesMatches: fixture.seriesMatches?.filter((series) =>
        series?.seriesAdWrapper?.seriesName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((fixture) => fixture.seriesMatches.length > 0);

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search by series name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="input input-bordered w-full max-w-60 rounded"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-5 lg:mt-0">
          <button
            onClick={() => setFixtureState('recent')}
            className={tabClasses('recent')}
          >
            Recent
          </button>
          <button
            onClick={() => setFixtureState('live')}
            className={tabClasses('live')}
          >
            Live
          </button>
          <button
            onClick={() => setFixtureState('upcoming')}
            className={tabClasses('upcoming')}
          >
            Upcoming
          </button>
        </div>
      </div>
      <div className="divider"></div>

      {loading ? (
        <GlobalLoading />
      ) : (
        <div>
          {filteredFixtures && filteredFixtures.length > 0 ? (
            filteredFixtures.map((fixture, index) => (
              <div key={index} className="fixture-item">
                <h4 className="rounded-t-lg border-b border-gray-300 bg-violet-100 px-4 py-1 text-2xl font-semibold text-primary">
                  {fixture.matchType}
                </h4>
                {fixture?.seriesMatches?.map((series, index) => (
                  <div key={index} className="mt-2">
                    <h4 className="px-3 py-1 text-base font-semibold">
                      {series?.seriesAdWrapper?.seriesName}
                    </h4>
                    <table className="w-full border-separate ">
                      <thead className="bg-slate-200">
                        <tr className="border-slate-200 text-center text-base">
                          <th className="text-center" style={{ width: '10%' }}>
                            Status
                          </th>
                          <th className="text-center" style={{ width: '25%' }}>
                            Team One
                          </th>
                          <th className="text-center" style={{ width: '20%' }}>
                            Match Info
                          </th>
                          <th className="text-center" style={{ width: '25%' }}>
                            Team Two
                          </th>
                          <th className="text-center" style={{ width: '20%' }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {series?.seriesAdWrapper?.matches?.map(
                          (match, index) => (
                            <CricketFixtureList
                              key={index}
                              match={match}
                              offset={offset}
                            />
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="p-10 text-center text-lg font-semibold">
              No fixtures available
            </p>
          )}
        </div>
      )}
    </div>
  );
}
