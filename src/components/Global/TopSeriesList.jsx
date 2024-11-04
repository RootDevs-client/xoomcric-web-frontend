'use client';

import SeriesItem from './SeriesItem';

export default function TopSeriesList({ topSeries, isLoadingTopSeries }) {
  // const { topSeries, isLoadingTopSeries } = useGetTopSeries();
  const shimmerArray = [1, 2, 3, 4, 5, 6, 7];

  if (isLoadingTopSeries) {
    return (
      <div className="space-y-4 mt-2 mb-2">
        {shimmerArray.map((shimmer) => (
          <div className="grid grid-cols-12" key={shimmer}>
            {/* <div className="col-span-2 w-7 h-7 bg-white rounded-full animate-pulse"></div> */}
            <div className="col-span-12 h-7 w-full bg-white animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  if (topSeries?.status) {
    return (
      <div className="grid gap-3">
        {topSeries.data.length === 0 ? (
          <div className="p-4 text-center text-gray-600">
            No popular Series found.
            <span className="text-sm text-gray-500 pt-4">
              Discover exciting Series from All Series and add them to your
              favorites!
            </span>
          </div>
        ) : (
          topSeries.data.map((series) => (
            <SeriesItem key={series?.id} series={series} />
          ))
        )}
      </div>
    );
  } else {
    return (
      <div className="p-2 font-medium">
        Failed to fetch data. Please try again later.
      </div>
    );
  }
}
