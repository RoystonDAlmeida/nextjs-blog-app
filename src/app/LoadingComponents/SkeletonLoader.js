const SkeletonLoader = () => (
    <div>
      <div className="flex justify-center">
        <div className="animate-pulse bg-gray-200 rounded-md w-3/5 h-[200px]" />
      </div>
      <div className="w-full mt-4 px-4">
        <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <div className="w-full mt-4 px-4">
        <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-2   00 rounded w-full"></div>
        </div>
      </div>
    </div>
  );

export default SkeletonLoader;