import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

async function main() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // GraphQL Server
  const gqlserver = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String,
        say(name: String): String
      }
      type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
      }
    `,
    resolvers: {
      Query: {
        hello: () => `hey!🙋🏻‍♂️ I am Graphql Server`,
        say: (_, { name }: { name: string }) => `hey!🙋🏻‍♂️ ${name}. How's day Going?`,
      },
      Mutation: {
        createUser: async (
          _: any,
          { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: "random_salt",
            },
          });
          return true;
        },
      },
    },
  });

  // Start gql server
  await gqlserver.start();

  app.use("/graphql", expressMiddleware(gqlserver));

  app.get("/", (req, res) => {
    res.json("hello ☕👨🏻‍💻");
  });

  app.listen(PORT, () => {
    console.log(`Server is Running at PORT NO: ${PORT}`);
  });
}

main().catch((error) => {
  console.error("Error starting server:", error);
});
