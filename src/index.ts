import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// import { User } from './entity/User';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import registerController from './controllers/registerController';
import loginController from './controllers/loginController';

(async () => {
  const app = express();

  app.post('/register', registerController);
  app.post('/login', loginController);

  await createConnection();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log('server working');
  });
})();
