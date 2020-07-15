require('dotenv').config();
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import cors from 'cors';
// import { createConnection } from 'typeorm';

import { createSchema } from "./utils/createSchema";
import MovieAPI from './datasources/tmdb';
declare var process: {
  env: {
    CLIENT_ORIGIN: string
    DATABASE_NAME: string
    PORT: number
  }
}

const main = async () => {
  // await createConnection();
  const schema = await createSchema();

  const dataSources = () => ({
    movieAPI: new MovieAPI(),
  });

  const apolloServer = new ApolloServer({
    schema,
    dataSources,
    context: ({ req, res }: any) => ({ req, res }),
  })

  const app = Express();

  app.use(cors({
    origin: process.env.CLIENT_ORIGIN
  }));

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`server started on localhost:${port}/graphql`)
  })
}

main();