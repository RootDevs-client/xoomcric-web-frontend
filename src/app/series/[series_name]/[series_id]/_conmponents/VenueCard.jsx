export default function VenueCard({ venue }) {
  return (
    <div className="my-3">
      <div className="bg-white border rounded ">
        {/* Country Header  */}
        <div className="bg-gray-100 py-2 text-center text-gray-800 font-semibold border-b">
          {venue?.country}
        </div>

        {/* Content */}
        <div className="flex p-4 space-x-4">
          {/* Stadium Icon  */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
              <img
                src={`https://static.cricbuzz.com/a/img/v1/i1/c${venue?.imageId}/cricket.jpg`}
                alt={venue?.country}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Text Content  */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              <span>{venue?.ground}</span>
            </h2>
            <p className="text-gray-600">{venue?.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
