import { readFileSync } from 'fs';
import * as path from 'path';
import { resolvers } from './resolvers';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const weatherDefs = readFileSync(
    path.resolve(__dirname, 'schema/air-water-quality.graphql'),
    {
        encoding: 'utf-8'
    }
);

interface MyContext {}

const server = new ApolloServer<MyContext>({
    typeDefs: weatherDefs,
    resolvers,
    introspection: true
});

startStandaloneServer(server, {
    listen: { port: 4000 }
    // context: async ({ req }) => ({ token: req.headers.token })
}).then(() => console.log('listening'));
