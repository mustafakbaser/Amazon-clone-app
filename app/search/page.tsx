import { Suspense } from "react";
import { SearchResults } from "@/components/search/search-results";

export default function SearchPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      {/* useSearchParams needs a Suspense boundary in a static export */}
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
