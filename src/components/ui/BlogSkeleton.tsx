const BlogSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Featured Article Skeleton */}
      <div className="mb-16">
        <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <div className="w-full h-64 lg:h-full bg-gray-200"></div>
            </div>
            <div className="lg:w-1/2 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSkeleton;