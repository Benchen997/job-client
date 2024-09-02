import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { gql } from "@apollo/client/core";
import { Job } from "@/model/Job";

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true,
  },
});

// Split based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);


const apolloClient = new ApolloClient({
  link: splitLink,
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

// GraphQL subscription to listen for new jobs being added
export const JOB_ADDED_SUBSCRIPTION = gql`
  subscription JobAdded {
    jobAdded {
      id
      name
      status
      createdAt
    }
  }
`;
// GraphQL subscription to listen for job status updates
export const JOB_UPDATED_SUBSCRIPTION = gql`
  subscription JobUpdated {
    jobUpdated {
      id
      name
      status
      createdAt
    }
  }
`;

// Function to handle subscriptions and refetch jobs when updates occur
export function setupJobSubscriptions(refetchJobs: () => void) {
  // Subscribe to jobAdded events
  apolloClient
    .subscribe({
      query: JOB_ADDED_SUBSCRIPTION,
    })
    .subscribe({
      next() {
        refetchJobs(); // Refetch jobs when a new job is added
      },
      error(err) {
        console.error("Error subscribing to jobAdded:", err);
      },
    });

  // Subscribe to jobUpdated events
  apolloClient
    .subscribe({
      query: JOB_UPDATED_SUBSCRIPTION,
    })
    .subscribe({
      next() {
        refetchJobs(); // Refetch jobs when a job's status is updated
      },
      error(err) {
        console.error("Error subscribing to jobUpdated:", err);
      },
    });
}
