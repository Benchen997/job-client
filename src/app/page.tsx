import JobDisplayTable from "@/ui/JobDisplayTable";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { Job, JobStatus } from "@/model/Job";

export default function Home() {
  function getRandomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  const startDate = new Date(2023, 0, 1); // January 1, 2023
  const endDate = new Date(2024, 11, 31); // December 31, 2024
  const jobs: Job[] = [
    {
      id: 1,
      name: "grocery_product.csv",
      status: JobStatus.PENDING,
      createdAt: getRandomDate(startDate, endDate),
    },
    {
      id: 2,
      name: "mobile_product.csv",
      status: JobStatus.IN_PROGRESS,
      createdAt: getRandomDate(startDate, endDate),
    },
    {
      id: 3,
      name: "home_product.csv",
      status: JobStatus.COMPLETED,
      createdAt: getRandomDate(startDate, endDate),
    },
    {
      id: 4,
      name: "electronics_product.csv",
      status: JobStatus.FAILED,
      createdAt: getRandomDate(startDate, endDate),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Suspense fallback={<Loading />}>
        <JobDisplayTable jobs={jobs} />
      </Suspense>
    </main>
  );
}
