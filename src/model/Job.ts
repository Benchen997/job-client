export enum JobStatus {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    FAILED = 'Failed',
}

export interface Job {
    id: number;
    name: string;
    status: JobStatus;
    createdAt: Date;
}
