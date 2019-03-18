'use strict'

const { test, trait } = use('Test/Suite')('Words')
const config = use('Config').get('words')

trait('Test/ApiClient')

test('get default amount of words', async ({ client, assert }) => {
  const response = await client.get('/words').end()

  response.assertStatus(200)
  assert.equal(response.body.length, config.defaultLimit)
})

test('get 100 words', async ({ client, assert }) => {
  const response = await client.get('/words?limit=100').end()

  response.assertStatus(200)
  assert.equal(response.body.length, 100)
})
