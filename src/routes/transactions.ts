import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { knex } from '../database'

import { z } from 'zod'

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    const transactions = await knex('transactions').select('*')

    return { transactions }
  })

  app.get('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const params = getTransactionParamsSchema.parse(request.params)

    const { id } = params

    const transaction = await knex('transactions')
      .select('*')
      .where({ id })
      .first()

    return { transaction }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number().positive(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
