'use client';

import GlobalLoading from '@/components/Global/GlobalLoading';
import { useAuthStore } from '@/lib/auth-store';
import useGetAllUsers from '@/lib/hooks/admin/useGetAllUsers';
import Link from 'next/link';
import { useState } from 'react';
import { BsGridFill } from 'react-icons/bs';
import { FaHome, FaList } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import UsersDeleteModal from './UsersDeleteModal';
import UsersGridView from './UsersGridView';
import UsersListView from './UsersListView';

export default function UsersHome() {
  const { token } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [singleUser, setSingleUser] = useState(null);
  const [isGrid, setIsGrid] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    typeof window !== 'undefined'
      ? Number(localStorage.getItem('usersPageNumber')) || 10
      : 10
  );

  const { allUsers, pagination, allUsersLoading, allUsersRefetch } =
    useGetAllUsers(token, {
      page: currentPage,
      limit: pageSize,
      search: searchQuery,
    });

  if (allUsersLoading) {
    return <GlobalLoading />;
  }

  const deleteUsersModalHandler = (user) => {
    setSingleUser(user);
    document.getElementById('usersDeleteModal').showModal();
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (e) => {
    const value = Number(e.target.value);
    localStorage.setItem('usersPageNumber', value);
    setPageSize(value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  console.log('pagination', pagination);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs p-5">
        <ul>
          <li>
            <Link href="/xoomadmin/dashboard">
              <FaHome className="text-xl" />
            </Link>
          </li>
          <li className="font-medium text-gray-700">Users</li>
        </ul>
      </div>

      {/* Add User */}
      <div className="flex justify-end">
        <Link
          href="/xoomadmin/users/create"
          className="btn btn-accent btn-sm btn-outline rounded-md"
        >
          <FaPlus /> Add New User
        </Link>
      </div>

      <div className="card w-full bg-white shadow-md px-5 py-10 mt-5">
        <h2 className="card-title mb-5">User List</h2>

        {/* Controls */}
        <div className="my-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="w-60 rounded border p-2 focus:w-80 focus:outline-blue-500"
          />

          <div className="flex items-center gap-5">
            <div className="flex gap-2">
              <FaList
                onClick={() => setIsGrid(false)}
                className={`cursor-pointer text-3xl ${
                  !isGrid && 'text-blue-500'
                }`}
              />
              <BsGridFill
                onClick={() => setIsGrid(true)}
                className={`cursor-pointer text-3xl ${
                  isGrid && 'text-blue-500'
                }`}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="font-medium">Page Size:</label>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="rounded border px-2 py-1"
              >
                {[10, 20, 50, 100, 200].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users */}
        {allUsers.length === 0 ? (
          <p className="p-10 text-center font-semibold text-gray-600">
            No Users Found
          </p>
        ) : (
          <div
            className={
              isGrid
                ? 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'
                : 'flex flex-col gap-y-5'
            }
          >
            {allUsers.map((user) => (
              <div key={user._id}>
                {isGrid ? (
                  <UsersGridView
                    user={user}
                    deleteUsersModalHandler={deleteUsersModalHandler}
                  />
                ) : (
                  <UsersListView
                    user={user}
                    deleteUsersModalHandler={deleteUsersModalHandler}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left: Page Info */}
              <div className="text-sm text-gray-600">
                Showing{' '}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, pagination.totalItems)}
                </span>{' '}
                of{' '}
                <span className="font-medium text-gray-900">
                  {pagination.totalItems}
                </span>{' '}
                users
              </div>

              {/* Center: Page Navigation */}
              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`
            p-2 rounded-lg transition-colors
            ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }
          `}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: Math.min(5, pagination.totalPages) },
                    (_, i) => {
                      let pageNum;
                      if (pagination.totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= pagination.totalPages - 2) {
                        pageNum = pagination.totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`
                  w-8 h-8 rounded-lg text-sm font-medium transition-colors
                  ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === pagination.totalPages}
                  className={`
            p-2 rounded-lg transition-colors
            ${
              currentPage === pagination.totalPages
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }
          `}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Right: Page Info */}
              <div className="text-sm text-gray-600">
                Page{' '}
                <span className="font-medium text-gray-900">{currentPage}</span>{' '}
                of{' '}
                <span className="font-medium text-gray-900">
                  {pagination.totalPages}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <UsersDeleteModal
        token={token}
        singleUser={singleUser}
        allUsersRefetch={allUsersRefetch}
      />
    </div>
  );
}
