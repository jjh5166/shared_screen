require('dotenv').config();
import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
// import { createConnection } from 'typeorm';

import { createSchema } from "./utils/createSchema";
import MovieAPI from './datasources/tmdb';
declare var process: {
  env: {
    DATABASE_NAME: string
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

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000/graphql')
  })
}

main();