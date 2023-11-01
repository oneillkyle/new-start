import { readFileSync } from 'fs';
import { resolvers } from './resolvers';

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const weatherDefs = readFileSync('./schema/weather.graphql', { encoding: 'utf-8' });


// interface MyContext {
//     dataSources: {
//       books: Book[];
//     };
//   }
  

const server = new ApolloServer({
    weatherDefs,
    resolvers,
    mocks: true,
    playground: true,
    introspection: true,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
