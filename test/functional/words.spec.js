'use strict'

const { test, trait } = use('Test/Suite')('Words')
const TestHelper = use('App/Services/TestHelper')
const WordsSeeder = require('../../database/seeds/WordSeeder')
const Answer = use('App/Models/Answer')
const config = use('Config').get('words')
const Database = use('Database')

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

test('get the most difficult words to learn', async ({ client, assert }) => {
  await Database.truncate('answers')
  const wordsPerLesson = 100
  const maximumDifficultWordsAmount = 50
  const createdWordsAmount = 200
  const user = await TestHelper.createUser()
  const wordsSeeder = new WordsSeeder()
  await wordsSeeder.run(createdWordsAmount)
  const words = await Database
    .select('id')
    .from('words')
    .orderByRaw('RANDOM()')
    .limit(maximumDifficultWordsAmount)
  const wordsIdsWithIncorrectAnswers = []

  await Promise.all(words.map(word => {
    wordsIdsWithIncorrectAnswers.push(word.id)
    return Answer.create({
      word_id: word.id,
      user_id: user.id,
      correct: false
    })
  }))

  const response = await client
    .get(`/words?filter[level]=difficult`)
    .loginVia(user)
    .end()
  const difficultWordsIds = response.body.map(word => word.id)
  response.assertStatus(200)
  assert.equal(response.body.length, wordsPerLesson)
  assert.includeMembers(difficultWordsIds, wordsIdsWithIncorrectAnswers)
})
