// Skeleton loading components for news aggregator

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton skeleton-text w-24 h-6"></div>
        <div className="skeleton w-2 h-2 rounded-full"></div>
      </div>

      {/* Image skeleton */}
      <div className="skeleton w-full h-48 sm:h-56 rounded-md mb-4"></div>

      {/* Title skeleton */}
      <div className="skeleton skeleton-title mb-3"></div>
      <div className="skeleton skeleton-text w-3/4 mb-4"></div>

      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>

      {/* Tags skeleton */}
      <div className="flex gap-2 mb-4">
        <div className="skeleton w-16 h-6 rounded-full"></div>
        <div className="skeleton w-20 h-6 rounded-full"></div>
        <div className="skeleton w-12 h-6 rounded-full"></div>
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="skeleton w-4 h-4 rounded"></div>
          <div className="skeleton w-12 h-4"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="skeleton w-8 h-4"></div>
          <div className="skeleton w-4 h-4"></div>
          <div className="skeleton w-4 h-4"></div>
          <div className="skeleton w-16 h-4"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonSidebar = () => {
  return (
    <div className="sidebar-card">
      <div className="skeleton skeleton-title mb-4"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-border pb-3 mb-3 last:border-b-0 last:mb-0">
          <div className="skeleton skeleton-text mb-2"></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      ))}
    </div>
  );
};

const SkeletonHeader = () => {
  return (
    <div className="animate-pulse">
      <div className="header-section">
        <div className="header-content">
          <div className="flex items-center gap-3">
            <div className="skeleton w-8 h-8 rounded"></div>
            <div className="skeleton w-40 h-8"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="skeleton w-20 h-8 rounded-md"></div>
            <div className="skeleton w-24 h-8 rounded-md"></div>
            <div className="skeleton w-20 h-8 rounded-md"></div>
          </div>
        </div>
      </div>
      
      <div className="trending-topics-bar">
        <div className="trending-topics-content">
          <div className="skeleton w-20 h-6 rounded-md"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton w-24 h-8 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

// Loading states for different sections
const SkeletonTrendingTopics = () => {
  return (
    <div className="sidebar-card">
      <div className="skeleton skeleton-title mb-4"></div>
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-border">
            <div className="skeleton w-24 h-4"></div>
            <div className="skeleton w-12 h-4 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkeletonNewsletter = () => {
  return (
    <div className="sidebar-card">
      <div className="skeleton skeleton-title mb-4"></div>
      <div className="skeleton w-full h-16 mb-4"></div>
      <div className="space-y-2">
        <div className="skeleton w-full h-10 rounded-md"></div>
        <div className="skeleton w-full h-10 rounded-md"></div>
      </div>
    </div>
  );
};

// Pulse animation for individual elements
const SkeletonPulse = ({ className = "w-full h-4" }) => {
  return <div className={`skeleton ${className}`}></div>;
};

// Loading spinner component
const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={`inline-block animate-spin ${sizeClasses[size]} ${className}`}>
      <svg
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

// Full page loading component
const PageLoading = () => {
  return (
    <div className="min-h-screen bg-background">
      <SkeletonHeader />
      <div className="main-content">
        <div className="content-grid">
          <div className="sidebar-section space-y-6">
            <SkeletonSidebar />
            <SkeletonTrendingTopics />
          </div>
          
          <div className="news-feed-section">
            <div className="skeleton w-64 h-8 mb-6"></div>
            <SkeletonGrid count={8} />
          </div>
          
          <div className="sidebar-section space-y-6">
            <SkeletonTrendingTopics />
            <SkeletonNewsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all skeleton components
export default SkeletonCard;
export {
  SkeletonSidebar,
  SkeletonHeader,
  SkeletonGrid,
  SkeletonTrendingTopics,
  SkeletonNewsletter,
  SkeletonPulse,
  LoadingSpinner,
  PageLoading
};
