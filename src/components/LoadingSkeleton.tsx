import React from "react";

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => (
  <div className={`animate-pulse bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-size-200 animate-shimmer rounded ${className}`} />
);

export default LoadingSkeleton;