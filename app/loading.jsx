import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function Loading() {
  // Skeleton layout that matches the page structure
  return (
    <div className="min-h-screen">
      {/* Hero Section Placeholder */}
      <div className="h-[60vh] bg-gray-100 animate-pulse" />

      {/* Main Content Loading */}
      <div className="py-16">
        <LoadingSpinner />
      </div>
    </div>
  );
}