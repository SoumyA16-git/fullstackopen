require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('./models/user')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI = process.env.MONGODB_URI

if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message)
    })
}

const getUserFromAuthHeader = async (auth) => {
  if (!auth) {
    return null
  }
  const cleanAuth = auth.trim()
  if (!cleanAuth.toLowerCase().startsWith('bearer ')) {
    return null
  }
  try {
    const token = cleanAuth.substring(7)
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || 'test-secret-key'
    )
    return await User.findById(decodedToken.id)
  } catch {
    return null
  }
}

const startServer = async (port = process.env.PORT || 4000) => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        const currentUser = await getUserFromAuthHeader(auth)
        return { currentUser }
      },
    })
  )

  httpServer.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}`)
  })

  return { server, httpServer }
}

if (require.main === module) {
  startServer()
}

module.exports = {
  typeDefs,
  resolvers,
  startServer,
}
