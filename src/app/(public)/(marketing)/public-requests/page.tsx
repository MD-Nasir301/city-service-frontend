import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ServiceRequestsContent } from "@/components/modules/servciePage/service-requests-content";

export default function PublicRequestsPage() {
  return (
    <main className="container min-h-screen px-4 md:px-8 mx-auto py-8 space-y-8">
      {/* Header & Hero Info Section */}

      <div className="space-y-1 rounded-2xl p-3 shadow-md shadow-blue-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold border-l-8 border-orange-400 pl-3 text-green-500 my-2">
          Public Requests
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Explore, filter, and track all community-reported service requests and
          city issues in real time.
        </p>
      </div>

      {/* Content Area with Suspense SSG Guard */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-32">
            <Spinner />
          </div>
        }
      >
        <ServiceRequestsContent />
      </Suspense>
    </main>
  );
}
