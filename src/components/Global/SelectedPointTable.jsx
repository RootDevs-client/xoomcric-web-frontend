'use client';

import getShortName from '@/lib/helpers/getShortName';
import Link from 'next/link';

const SelectedPointTable = ({
  selectedPointTable,
  isLoadingSelectedPointTable,
}) => {
  // const { selectedPointTable, isLoadingSelectedPointTable } =
  //   useGetSelectedPointTable();

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (isLoadingSelectedPointTable) {
    return (
      <div className="space-y-4 mt-2 mb-2">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 h-16 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
          {arr.map((shimmer) => (
            <>
              <div
                key={shimmer}
                className="col-span-6 h-6 w-full bg-[#F0F0F0] animate-pulse rounded-md"
              ></div>
              <div className="col-span-2 h-6 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
              <div className="col-span-2 h-6 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
              <div className="col-span-2 h-6 w-full bg-[#F0F0F0] animate-pulse rounded-md"></div>
            </>
          ))}
        </div>
      </div>
    );
  }

  if (selectedPointTable?.status) {
    return (
      <div className="flex flex-col items-center my-3">
        <div className="bg-primary h-16 w-full -skew-y-1">
          <div className="skew-y-1 flex items-center justify-between h-full p-4">
            <h4 className="text-white text-[16px] font-semibold">
              {selectedPointTable?.data.series_name}
            </h4>

            {/* <img
              src={selectedPointTable?.data.league_image}
              alt={selectedPointTable?.data.league_name}
              className="w-8 h-8 ring-1 ring-primary mr-4 rounded-full bg-white p-1"
            /> */}
          </div>
        </div>
        <div className="h-auto w-full -skew-y-1">
          <div className="skew-y-1 ">
            {selectedPointTable?.data?.pointTables?.map(
              (pointTables, index) => (
                <div key={index} className="bg-base-100  rounded-sm p-2 mb-3">
                  <div className="grid grid-cols-8 text-sm text-gray-400 items-center mb-2 border-b border-gray-300 pb-2">
                    <p className="col-span-1 font-medium">#</p>

                    <div className="col-span-4 flex items-center">
                      <p className="font-medium">
                        {pointTables?.groupName || ''}
                      </p>
                    </div>

                    <p className="col-span-1 font-medium">MP</p>
                    <p className="col-span-1 font-medium">MW</p>
                    <p className="col-span-1 font-medium">PTS</p>
                  </div>
                  {pointTables?.pointsTableInfo.map((tableInfo, index) => (
                    <Link
                      key={tableInfo.tableInfo}
                      href={`/team/${tableInfo?.teamName}/${
                        tableInfo?.teamId || 0
                      }`}
                    >
                      <div className="grid grid-cols-8 text-sm text-black items-center mb-2">
                        <p className="col-span-1 font-medium">{index + 1}</p>
                        <div className="col-span-4 flex items-center">
                          <img
                            src={`https://static.cricbuzz.com/a/img/v1/i1/c${tableInfo?.teamImageId}/cricket.jpg`}
                            alt={tableInfo?.teamName}
                            className="w-6 h-6 ring-1 ring-primary mr-2 rounded-full"
                          />
                          <p className="font-medium">
                            {tableInfo?.teamName
                              ? getShortName(tableInfo?.teamName)
                              : ''}
                          </p>
                        </div>
                        <p className="col-span-1 font-medium">
                          {tableInfo?.matchesPlayed || 0}
                        </p>
                        <p className="col-span-1 font-medium">
                          {tableInfo?.matchesWon || 0}
                        </p>
                        <p className="col-span-1 font-medium">
                          {tableInfo?.points || 0}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-3">
      <div className="bg-primary h-16 w-full -skew-y-1">
        <div className="skew-y-1 flex items-center justify-between h-full p-4">
          <h4 className="text-white text-[16px] font-semibold">League Name</h4>

          <img
            src="/images/team_placeholder.png"
            alt="league-image"
            className="w-8 h-8 ring-1 ring-primary mr-4 rounded-full bg-white p-1"
          />
        </div>
      </div>
      <div className="bg-base-100 h-auto w-full -skew-y-1">
        <div className="p-4 text-center text-gray-600">
          It seems there{"'"}s no data available at the moment. <br />
          <span className="text-sm text-gray-500 pt-4">
            Please check back again later or explore other sections of our
            platform.
          </span>
        </div>
      </div>
    </div>
  );
};
export default SelectedPointTable;
