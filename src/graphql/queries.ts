import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { Job } from "@/model/Job";

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export async function getJobs(): Promise<Job[]> {
  const query = gql`
    query GetJobs {
      jobs {
        id
        name
        status
        createdAt
      }
    }
  `;
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: "network-only",
  });
  // Map the returned data to the expected types
  return data.jobs.map((job: any) => ({
    ...job,
    createdAt: new Date(job.createdAt), // Convert the createdAt string to a Date object
  }));
}
