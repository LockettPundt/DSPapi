#!/usr/bin/env node

import { ApolloServer } from 'apollo-server-express';
import app from '../app';
//const debug = require('debug')('dspapi:server');
import * as debug from 'debug'
import { createServer } from 'http'
import { PORT } from '../config'
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../typeDefs/typeDefs';
import resolvers from '../resolvers/resolvers';
import { GraphQLSchema } from 'graphql'

debug.enable('dspapi:server')

const port = normalizePort(PORT || '3000');
app.set('port', port);

const httpServer = createServer(app);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req }) => req,
});

server.applyMiddleware({ app, path: '/graphql' });
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;


  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}


function onListening() {
  const addr = httpServer.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr?.port}`;
  debug.log(`Listening on ${bind}`);
}
