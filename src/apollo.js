import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/v1/graphql",
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const link = split(
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

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache: cache,
  link,
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
