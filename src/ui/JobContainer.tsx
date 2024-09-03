"use client";
import React, { useEffect } from "react";
import JobDisplayTable from "./JobDisplayTable";
import { useSocket } from "@/context/SocketContext";

export default function JobContainer() {
  const { jobs: contextJobs } = useSocket();

  useEffect(() => {
    console.log("Current jobs in context:", contextJobs);
  }, [contextJobs]);

  return <JobDisplayTable jobs={contextJobs} />;
}
