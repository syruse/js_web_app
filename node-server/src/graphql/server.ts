/// inject apollo graphql service
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const typeDefs = gql(fs.readFileSync('./graphql/schema.graphql', {encoding: 'utf-8'}));
const resolvers = require('./resolvers');
const context = ( {req} ) => ( {sessionID: req.sessionID, user: req.user} );
const apolloServer = new ApolloServer({typeDefs, resolvers, context});
/// Required logic for integrating with Express
apolloServer.start().then( () => {
    console.log('graphql service is available with "/graphql" postfix');
    apolloServer.applyMiddleware({app, path: '/graphql'});
}).catch( err => {
    console.log(' graphql service failed');
    throw err;
});