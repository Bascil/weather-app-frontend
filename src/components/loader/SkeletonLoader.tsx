import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen p-4 space-x-4">
      {/* Sidebar Skeleton */}
      <div className="md:w-1/4 flex flex-col items-center justify-center bg-gray-200 p-4 rounded-md shadow-lg">
        <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 animate-pulse"></div>
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="md:w-3/4 flex flex-col p-4 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-3/4 h-12 bg-gray-300 rounded-md animate-pulse"></div>
          <div className="w-16 h-12 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="flex space-x-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-1/3 min-h-[200px] bg-gray-300 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
        <div className="w-full min-h-[150px] bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
