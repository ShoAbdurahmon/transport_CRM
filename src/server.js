import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import http from 'http'
import '#config/index'
import context from "./context.js"

import schema from './modules/index.js'

!async function () {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
      schema,
      context,
      csrfPrevention: true,
      introspection: true,
      plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer }),
          ApolloServerPluginLandingPageGraphQLPlayground()
      ],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}()