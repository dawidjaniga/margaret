'use strict'

const { test, trait } = use('Test/Suite')('Words')
const TestHelper = use('App/Services/TestHelper')
const config = use('Config').get('words')

trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('get default amount of words', async ({ client, assert }) => {
  const user = await TestHelper.createUser()
  const response = await client
    .get('/words')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.length, config.defaultLimit)
})

test('get 100 words', async ({ client, assert }) => {
  const user = await TestHelper.createUser()
  const response = await client
    .get('/words?limit=100')
    .loginVia(user)
    .end()

  response.assertStatus(200)
  assert.equal(response.body.length, 100)
})
