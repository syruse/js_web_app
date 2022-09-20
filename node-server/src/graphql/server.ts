import { ApolloServer, gql } from 'apollo-server-express'
import * as fs from 'fs';
import * as resolvers from './resolvers';
import {Express} from 'express';

const SCHEMA = './src/graphql/schema.graphql';

const context = ( {req} ) => ( {user: req.user} );

/// inject apollo graphql service
export default function enableGraphQLserver(app: Express, path: string = '/graphql') {
    const typeDefs = gql(fs.readFileSync(SCHEMA, {encoding: 'utf-8'}));
    const apolloServer = new ApolloServer({typeDefs, resolvers, context});
    /// Required logic for integrating with Express
    apolloServer.start().then( () => {
        console.log('graphql service is available at ' + path);
        apolloServer.applyMiddleware({app, path: path});
    }).catch( err => {
        console.log('graphql service failed ' + err.message);
        throw err;
    });
}
