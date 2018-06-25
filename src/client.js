import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://4r7lpm7wx9.lp.gql.zone/graphql' }),
  cache: new InMemoryCache()
});
