'use client';
import { useEffect, useState } from 'react';
import { Job } from "@/model/Job";
import JobDisplayTable from "@/ui/JobDisplayTable";
import { setupJobSubscriptions, getJobs } from "@/graphql/queries";

export default function JobListWithSubscription({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  useEffect(() => {
    // Function to refetch and update the jobs
    const refetchJobs = async () => {
      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
    };

    setupJobSubscriptions(refetchJobs); // Set up subscriptions for job updates
  }, []);

  return <JobDisplayTable jobs={jobs} />;
}
