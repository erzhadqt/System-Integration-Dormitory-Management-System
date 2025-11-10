import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="text-blue-700 font-semibold text-lg tracking-wide">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
