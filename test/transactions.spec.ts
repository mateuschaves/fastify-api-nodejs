import { beforeAll, afterAll, describe, it, expect, beforeEach } from 'vitest'

import request from 'supertest'

import { app } from '../src/app'
import { execSync } from 'child_process'

describe('Transactions', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('yarn knex migrate:rollback --all')
    execSync('yarn knex migrate:latest')
  })

  it('should be able to create a new transactions', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Salário',
        amount: 3000,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'Salário',
      amount: 3000,
      type: 'credit',
    })

    const cookies = response.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Salário',
        amount: 3000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'Salário',
      amount: 3000,
      type: 'credit',
    })

    const cookies = response.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'Salário',
        amount: 3000,
      }),
    )
  })

  it('should be able to get the summary', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'Salário',
      amount: 9000,
      type: 'credit',
    })

    const cookies = response.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Aluguel',
        amount: 1700,
        type: 'debit',
      })
      .set('Cookie', cookies)

    const summaryTransactionResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryTransactionResponse.body.summary.amount).toBe(7300)
  })
})
