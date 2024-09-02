import { Job } from "@/model/Job";
import { Suspense } from "react";
import { getJobs } from "@/app/actions/actions";
import JobDisplayTable from "@/ui/JobDisplayTable";

export default async function Page() {
  const  data  = await getJobs();
  // map jobs creatAt from string to Date
  const jobs = data.map((job: Job) => {
    job.createdAt = new Date(job.createdAt);
    return job;
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobDisplayTable jobs={jobs} />
    </Suspense>
  );
}
