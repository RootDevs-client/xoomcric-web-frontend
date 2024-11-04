'use client';

import useGetAllSubscriptions from '@/lib/hooks/admin/useGetAllSubscriptions';
import Link from 'next/link';
import { useState } from 'react';
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsGridFill,
} from 'react-icons/bs';
import { FaHome, FaList } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import SubscriptionDeleteModal from './SubscriptionDeleteModal';
import SubscriptionGridView from './SubscriptionGridView';
import SubscriptionListView from './SubscriptionListView';
import GlobalLoading from '@/components/Global/GlobalLoading';

export default function SubscriptionHome({ session }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [singleSubscription, setSingleSubscription] = useState(null);
  const [isGrid, setIsGrid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    typeof window !== 'undefined'
      ? localStorage?.getItem('subscriptionPageNumber') || 10
      : 10
  );
  const { allSubscriptions, allSubscriptionsLoading, allSubscriptionsRefetch } =
    useGetAllSubscriptions(session);

  if (allSubscriptionsLoading) {
    return <><GlobalLoading/></>;
  }

  const deleteSubscriptionModalHandler = (subscription) => {
    setSingleSubscription(subscription);
    document.getElementById('subscriptionDeleteModal').showModal();
  };

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching.
  }

  function handlePageSizeChange(event) {
    localStorage.setItem('subscriptionPageNumber', event.target.value);
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size.
  }

  const filteredAllSubscriptions = searchQuery
    ? allSubscriptions.filter((subscription) =>
        subscription.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSubscriptions;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const allSubscriptionsToDisplay = filteredAllSubscriptions?.slice(
    startIndex,
    endIndex
  );

  function handleNextPage() {
    if (currentPage < Math.ceil(filteredAllSubscriptions.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const totalPages = Math.ceil(filteredAllSubscriptions.length / pageSize);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handlePageNumberClick(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/xoomadmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium text-gray-700">Subscription</li>
        </ul>
      </div>

      <div className="flex items-center justify-end">
        <Link
          href="/xoomadmin/subscriptions/create"
          className="btn btn-accent btn-sm btn-outline rounded-md"
        >
          <FaPlus /> Add New Subscription
        </Link>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">Subscription List</h2>
        {/* Page size selector */}
        <div className="my-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="w-60 rounded border p-2 transition-all duration-300 ease-linear focus:w-80 focus:outline-blue-500"
          />
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <div className="tooltip" data-tip="List view">
                <FaList
                  onClick={() => setIsGrid(false)}
                  className={`cursor-pointer border border-gray-200 p-1 text-3xl ${
                    !isGrid && 'text-blue-500'
                  }`}
                />
              </div>
              <div className="tooltip" data-tip="Grid view">
                <BsGridFill
                  onClick={() => setIsGrid(true)}
                  className={`cursor-pointer border border-gray-200 p-1 text-3xl ${
                    isGrid && 'text-blue-500'
                  }`}
                />
              </div>
            </div>
            <div className="gap-w flex items-center">
              <label htmlFor="pageSizeSelect" className="mr-2 font-medium">
                Page Size:
              </label>
              <select
                id="pageSizeSelect"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="rounded border px-2 py-1 outline-none"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>

        {/* Render QR matches with animations */}
        <div>
          {allSubscriptionsToDisplay.length === 0 && (
            <p className="p-10 text-center text-lg font-semibold text-gray-600">
              No Subscriptions data added.
            </p>
          )}
          <div
            className={`${
              isGrid
                ? 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'
                : 'flex w-full flex-col gap-y-5'
            }`}
          >
            {allSubscriptionsToDisplay.map((subscription) => (
              <div key={subscription._id} id={subscription._id}>
                {isGrid ? (
                  <SubscriptionGridView
                    subscription={subscription}
                    refetch={allSubscriptionsRefetch}
                    deleteSubscriptionModalHandler={
                      deleteSubscriptionModalHandler
                    }
                  />
                ) : (
                  <SubscriptionListView
                    subscription={subscription}
                    refetch={allSubscriptionsRefetch}
                    deleteSubscriptionModalHandler={
                      deleteSubscriptionModalHandler
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {filteredAllSubscriptions.length > pageSize && (
          <div className="my-4 flex justify-center">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <BsFillArrowLeftSquareFill
                className={`rounded-l text-3xl font-semibold ${
                  currentPage === 1
                    ? 'text-gray-300'
                    : 'text-blue-500 hover:text-blue-600'
                } `}
              />
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageNumberClick(pageNumber)}
                className={`mx-1 rounded hover:bg-blue-500 hover:text-white ${
                  pageNumber === currentPage
                    ? 'bg-blue-500 text-white h-8 w-8'
                    : 'border border-blue-300 bg-white text-blue-500 h-8 w-8'
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <BsFillArrowRightSquareFill
                className={`rounded-r text-3xl font-semibold ${
                  currentPage === totalPages
                    ? 'text-gray-300'
                    : 'text-blue-500 hover:text-blue-600'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      <SubscriptionDeleteModal
        session={session}
        singleSubscription={singleSubscription}
        allSubscriptionsRefetch={allSubscriptionsRefetch}
      />
    </div>
  );
}
