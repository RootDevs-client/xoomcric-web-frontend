'use client';

import { xoomBackendUrl } from '@/lib/axios/getAxios';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import useGetPopularSeries from '@/lib/hooks/admin/useGetPopularSeries';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiSolidCricketBall } from 'react-icons/bi';
import { FaHome } from 'react-icons/fa';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { LuPlus } from 'react-icons/lu';
import { RiCloseCircleFill } from 'react-icons/ri';
import AddChannelModal from './AddChannelModal';
import AddNewsModal from './AddNewsModal';
import SeriesDeleteModal from './SeriesDeleteModal';
import SeriesItem from './SeriesItem';

function PopularSeriesList({ seriesData, session }) {
  const [showSeries, setShowSeries] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [addingSeries, setAddingSeries] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [singleSeries, setSingleSeries] = useState(null);
  const [seriesList, setSeriesList] = useState([]);

  const { popularSeries, popularSeriesLoading, popularSeriesRefetch } =
    useGetPopularSeries(session);

  useEffect(() => {
    if (!popularSeriesLoading) {
      setSeriesList(popularSeries);
    }
  }, [popularSeries, popularSeriesLoading]);

  const addNewsModalHandler = (selectedSeries) => {
    setSingleSeries(selectedSeries);
    document.getElementById('addNewsUrlModal').showModal();
  };

  const addChannelModalHandler = (selectedSeries) => {
    setSingleSeries(selectedSeries);
    document.getElementById('addChannelUrlModal').showModal();
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    const searchResult = seriesData?.filter((series) =>
      series?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
    );

    setShowSeries(searchResult);
    setShowSearchModal(true);
  };

  const addSeriesHandler = async (series) => {
    try {
      setAddingSeries(true);
      const { data } = await xoomBackendUrl.post(
        '/api/admin/popular-series/create',
        {
          id: series?.id,
          name: series?.name,
          startDate: series?.startDt,
          endDate: series?.endDt,
        },
        {
          headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
        }
      );

      if (data.status) {
        setShowSearchModal(false);
        setSearchInput('');
        setAddingSeries(false);
        toast.success(data?.message);
        popularSeriesRefetch();
      } else {
        setAddingSeries(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setAddingSeries(false);
      console.error(error);
    }
  };

  const deleteSeriesHandler = (series) => {
    setSingleSeries(series);
    document.getElementById('leagueDeleteModal').showModal();
  };

  const selectPointTableHandler = async (id) => {
    try {
      const { data } = await xoomBackendUrl.post(
        '/api/admin/popular-series/update/select-point-table',
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
        }
      );

      if (data.status) {
        popularSeriesRefetch();
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchModal = () => {
    setShowSearchModal(false);
    setSearchInput('');
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = seriesList.findIndex((item) => item.id === active.id);
      const overIndex = seriesList.findIndex((item) => item.id === over.id);
      const newItems = arrayMove(seriesList, activeIndex, overIndex);
      newItems.forEach((item, index) => {
        item.position = index + 1;
      });

      setSeriesList(newItems);

      const leagueIdWithPosition = newItems.map((item) => {
        return { id: item.id, position: item.position };
      });

      try {
        // setIsSorting(true);
        const { data } = await xoomBackendUrl.post(
          '/api/admin/popular-series/sort',
          leagueIdWithPosition,
          {
            headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
          }
        );

        if (data?.status) {
          // setIsSorting(false);
          toast.success(data?.message);
        }
      } catch (err) {
        // setIsSorting(false);
        toast.error('Failed to sort!');
      } finally {
        // setIsSorting(false);
      }
    }
  };

  return (
    <div>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/xoomadmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium">Popular Series</li>
        </ul>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10">
        <h2 className="card-title text-gray-600 mb-2">Search Popular Series</h2>
        <div className="form-control w-10/12 lg:w-4/12 relative">
          <input
            className="input input-bordered bg-white pr-10"
            placeholder="Type here..."
            onChange={handleSearch}
            value={searchInput}
          />
          <HiMagnifyingGlass className="text-2xl absolute top-3 right-3" />

          <div
            className={`${
              showSearchModal ? 'block' : 'hidden'
            } max-h-[300px] w-full shadow-md bg-white absolute top-24 z-10 rounded-md`}
          >
            <div className="relative py-2">
              <RiCloseCircleFill
                className="absolute -right-2 -top-2 text-2xl text-secondary cursor-pointer"
                onClick={handleSearchModal}
              />
              <div className="overflow-y-auto px-5 pb-5 pt-10 max-h-[280px]">
                <ul className="w-full rounded-box">
                  {showSeries.length > 0 ? (
                    <>
                      {showSeries.map((league) => (
                        <li
                          key={league.league_id}
                          className="grid grid-cols-12 p-2 bg-gray-200 mb-2 rounded-md"
                        >
                          <div className="col-span-8 flex items-center justify-start">
                            {/* <img
                              src={league.image_path}
                              alt="Logo"
                              className="w-[40px] rounded-full"
                            /> */}
                            <span className="font-medium ml-2">
                              {league.name}
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center justify-center">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => addSeriesHandler(league)}
                              disabled={addingSeries}
                            >
                              Add <LuPlus className="text-xl" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className="grid grid-cols-12 p-2 bg-gray-200 mb-2 rounded-md">
                      <div className="col-span-12 flex items-center justify-center">
                        <span className="font-medium ml-2">
                          No Series Found!
                        </span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5 text-gray-600">Popular Series List</h2>
        <div>
          <div className="w-full rounded-box">
            {popularSeriesLoading ? (
              <div className="flex justify-center p-5 h-44">
                <div className="animate-bounce">
                  <BiSolidCricketBall className="text-3xl animate-spin text-secondary" />
                </div>
              </div>
            ) : seriesList?.length > 0 ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={seriesList}
                >
                  {seriesList.map((series) => (
                    <SeriesItem
                      key={series._id}
                      series={series}
                      session={session}
                      selectPointTableHandler={selectPointTableHandler}
                      deleteSeriesHandler={deleteSeriesHandler}
                      addNewsModalHandler={addNewsModalHandler}
                      addChannelModalHandler={addChannelModalHandler}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-600 font-medium">
                  No popular series available. Add some series to the list!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add News Modal  */}
      <AddNewsModal
        singleSeries={singleSeries}
        session={session}
        refetch={popularSeriesRefetch}
        category={'leagues'}
      />

      {/* Add Channel Modal  */}
      <AddChannelModal
        singleSeries={singleSeries}
        session={session}
        refetch={popularSeriesRefetch}
        category={'series'}
      />

      <SeriesDeleteModal
        singleSeries={singleSeries}
        session={session}
        popularSeriesRefetch={popularSeriesRefetch}
      />
    </div>
  );
}

export default PopularSeriesList;
