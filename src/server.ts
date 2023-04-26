import fastify from 'fastify'
import { transactionRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server is running on port 3000')
  })
