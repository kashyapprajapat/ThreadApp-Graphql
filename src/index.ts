import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";

async function main() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // GraphQL Server
  const gqlserver = await createApolloGraphqlServer();
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
