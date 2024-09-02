import JobListWithSubscription from "@/ui/JobListContainer";
import { Job } from "@/model/Job";
import { getJobs } from "@/graphql/queries";
import { Suspense } from "react";

export default async function Page() {
  const jobs: Job[] = await getJobs();

  return (
    <Suspense fallback={<div>Loading...</div>}>
     <JobListWithSubscription initialJobs={jobs} />
    </Suspense>
  );
}
