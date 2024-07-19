import { ApolloServer } from "@apollo/server";
import { User } from './user'

async function createApolloGraphqlServer() {
  const gqlserver = new ApolloServer({
    typeDefs: `
          type Query {
               hello: String
               ${User.queries}
          }
          type Mutation {
              ${User.mutations}
          }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: {
        ...User.resolvers.mutaions
      },
    },
  });

  // Start gql server
  await gqlserver.start();
  return gqlserver;
}

export default createApolloGraphqlServer;