export enum JobStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface Job {
  id: number;
  name: string;
  status: JobStatus;
  createdAt: Date;
}
