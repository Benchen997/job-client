"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { Job } from "@/model/Job";
import axios from "axios";

interface SocketContextType {
  jobs: Job[];
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/jobs");
      const fetchedJobs = response.data.map((job: Job) => {
        return {
          ...job,
          createdAt: new Date(job.createdAt),
        };
      });
      setJobs(fetchedJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      fetchJobs();
    });

    socket.on("jobAdded", (newJob: Job) => {
      console.log("Received jobAdded event:", newJob);
      newJob.createdAt = new Date(newJob.createdAt);
      setJobs((prevJobs) => {
        if (!prevJobs.some((job) => job.id === newJob.id)) {
          return [...prevJobs, newJob];
        }
        return prevJobs;
      });
    });

    socket.on("jobUpdated", (updatedJob: Job) => {
      console.log("Received jobUpdated event:", updatedJob);
      updatedJob.createdAt = new Date(updatedJob.createdAt);
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ jobs }}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
