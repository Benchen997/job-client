import { Job } from "@/model/Job";
import axios from "axios";

export async function getJobs(): Promise<Job[]> {
    try {
        const response = await axios.get("http://localhost:3000/jobs");
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}