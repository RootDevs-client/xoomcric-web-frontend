export default function VenueCardShimmer() {
  return (
    <div className="animate-pulse my-3">
      <div className="bg-white border rounded">
        {/* Country Header */}
        <div className="bg-gray-100 py-2 text-center text-gray-300 font-semibold border-b h-8"></div>

        {/* Content */}
        <div className="flex p-4 space-x-4">
          {/* Stadium Icon Shimmer */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-200 rounded"></div>
          </div>

          {/* Text Content Shimmer */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
