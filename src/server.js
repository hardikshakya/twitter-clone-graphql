import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { Server as SocketIOServer } from 'socket.io';

// types
import typeDefs from './schema/typeDefs.js';

// resolvers
import resolvers from './schema/resolvers/index.js';

const app = express();
const httpServer = http.createServer(app);

// CORS configuration
app.use(cors({ origin: '*' }));

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, io }),
});

await server.start();
server.applyMiddleware({ app });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  // Additional socket.io event handlers here
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
