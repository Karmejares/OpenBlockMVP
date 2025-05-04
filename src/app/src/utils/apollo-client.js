// src/utils/apollo-client.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/tuusuario/loan-subgraph", // <-- Reemplaza esto
  cache: new InMemoryCache(),
});

export default client;
