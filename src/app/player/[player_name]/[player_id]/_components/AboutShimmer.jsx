export default function AboutShimmer() {
  return (
    <div className="">
      <div className="mx-auto">
        <div className="space-y-2">
          {[1, 2, 3].map((_, index) => (
            <div key={index}>
              <div className="w-full">
                <div className="bg-blue-100 h-6 w-20 rounded-md shimmer" />
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex gap-3 items-center bg-gray-100 p-2 rounded-lg">
                  <div className="h-5 w-40 bg-gray-200 rounded shimmer" />
                  <div className="w-full">
                    <div className="h-5 bg-gray-200 rounded shimmer mb-1" />
                    <div className="h-5 bg-gray-200 rounded shimmer" />
                  </div>
                </div>
                <div className="flex gap-3 items-center bg-gray-100 p-2 rounded-lg">
                  <div className="h-5 w-16 bg-gray-200 rounded shimmer" />
                  <div className="w-full">
                    <div className="h-5 bg-gray-200 rounded shimmer mb-1" />
                    <div className="h-5 bg-gray-200 rounded shimmer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
