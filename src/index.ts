import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";


async function main() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());


  //Graphql Server

  const gqlserver = new ApolloServer({
    typeDefs: `
      type Query {
        hello:String,
        say(name:String):String
      }
    `,
    resolvers: {
        Query :{
            hello: ()=> `hey!🙋🏻‍♂️ I am Graphql Server`,
            say: (_,{name}: {name:String})=>  `hey!🙋🏻‍♂️ ${name}. How's day Going?`,
        }
    },
  });

  //Start  gql server
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
