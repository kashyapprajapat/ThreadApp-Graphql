import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
import UserService from "./services/user";

async function main() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // GraphQL Server
  app.use("/graphql", expressMiddleware(await createApolloGraphqlServer(),{
    context: async ({req})=>{
      // @ts-ignore
       const token = req.headers['token']
       try {
        const user  = UserService.decodeJWTToken(token as string);
        return { user };
       } catch (error) {
        return {};
       }

    }
  }));

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
