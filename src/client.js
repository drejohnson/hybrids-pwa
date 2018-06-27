import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://eu1.prisma.sh/phreshr/typescript-graphql-server/dev'
  }),
  cache: new InMemoryCache()
});
