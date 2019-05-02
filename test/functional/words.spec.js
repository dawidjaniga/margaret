'use strict'

const { test, trait } = use('Test/Suite')('Words')
const TestHelper = use('App/Services/TestHelper')
const WordsSeeder = require('../../database/seeds/WordSeeder')
const Answer = use('App/Models/Answer')
const config = use('Config').get('words')
const Database = use('Database')
const random = require('lodash/random')
const range = require('lodash/range')
const shuffle = require('lodash/shuffle')
const subDays = require('date-fns/sub_days')
const isBefore = require('date-fns/is_before')

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
  const wordsPerLesson = 50
  const createdWordsAmount = 200
  const user = await TestHelper.createUser()
  const wordsSeeder = new WordsSeeder()
  await wordsSeeder.run(createdWordsAmount)
  const words = await Database
    .select('id')
    .from('words')
    .orderByRaw('RANDOM()')
    .limit(wordsPerLesson)
  const wordsAnswers = {}
  const answerPromises = []
  const yesterdayDate = subDays(new Date(), 1)

  await Promise.all(words.map(word => {
    range(0, random(5, 10)).forEach(() => {
      const createdDate = subDays(new Date(), random(0, 4))
      const answerResult = !!Math.round(Math.random())
      answerPromises.push(Database.table('answers').insert({
        word_id: word.id,
        user_id: user.id,
        answered_syllable: 1,
        correct: answerResult,
        created_at: createdDate
      }))

      if (isBefore(createdDate, yesterdayDate)) {
        if (!wordsAnswers[word.id]) {
          wordsAnswers[word.id] = {
            id: word.id,
            correct: 0,
            sum: 0,
            ratio: 0
          }
        }

        if (answerResult) {
          wordsAnswers[word.id].correct += 1
        }

        wordsAnswers[word.id].sum += 1
        wordsAnswers[word.id].ratio = wordsAnswers[word.id].correct / wordsAnswers[word.id].sum
      }
    })
  }))

  await Promise.all(answerPromises)

  const response = await client
    .get(`/words?filter[level]=difficult&limit=${wordsPerLesson}`)
    .loginVia(user)
    .end()
  const difficultWordsIds = response.body.map(word => word.id)
  const wordsRatioIds = Object.values(wordsAnswers)
    .sort((a, b) => a.ratio - b.ratio)
    .map(item => item.id)
  response.assertStatus(200)
  assert.isAtMost(response.body.length, wordsPerLesson)
  assert.includeMembers(difficultWordsIds, wordsRatioIds)
})

test('get new words', async ({ client, assert }) => {
  await Database.truncate('answers')
  const wordsPerLesson = 50
  const createdWordsAmount = 200
  const user = await TestHelper.createUser()
  const wordsSeeder = new WordsSeeder()
  await wordsSeeder.run(createdWordsAmount)
  const words = await Database
    .select('id')
    .from('words')
    .orderByRaw('RANDOM()')
    .limit(wordsPerLesson)
  const wordsWithAnswersIds = []
  const answerPromises = []

  await Promise.all(words.map(word => {
    answerPromises.push(Database.table('answers').insert({
      word_id: word.id,
      user_id: user.id,
      answered_syllable: 1,
      correct: true
    }))

    wordsWithAnswersIds.push(word.id)
  }))

  await Promise.all(answerPromises)

  const response = await client
    .get(`/words?filter[status]=new&limit=${wordsPerLesson}`)
    .loginVia(user)
    .end()
  const newWordsIds = response.body.map(word => word.id)
  response.assertStatus(200)
  assert.isAtMost(response.body.length, wordsPerLesson)
  assert.notIncludeMembers(newWordsIds, wordsWithAnswersIds)
})

test('get top 10 incorrect words', async ({ client, assert }) => {
  await Database.truncate('answers')
  const topWordsAmount = 10
  const incorrectAnswersStart = 1
  const incorrectAnswersEnd = topWordsAmount + 5
  const createdWordsAmount = topWordsAmount * 2
  const user = await TestHelper.createUser()
  const wordsSeeder = new WordsSeeder()
  await wordsSeeder.run(createdWordsAmount)
  const words = await Database
    .select('id')
    .from('words')
    .orderByRaw('RANDOM()')
    .limit(topWordsAmount)
  const wordsIdsWithIncorrectAnswers = []
  const answersPromises = []
  const numbersRange = shuffle(range(incorrectAnswersStart, incorrectAnswersEnd))

  words.map(word => {
    const incorrectAnswersAmount = numbersRange.shift()
    wordsIdsWithIncorrectAnswers.push(
      {
        id: word.id,
        incorrectAnswersAmount
      })
    range(0, incorrectAnswersAmount).forEach(() => {
      answersPromises.push(Answer.create({
        word_id: word.id,
        user_id: user.id,
        correct: false
      }))
    })
  })
  await Promise.all(answersPromises)
  const orderedWordsIdsWithIncorrectAnswers = wordsIdsWithIncorrectAnswers
    .sort((a, b) => b.incorrectAnswersAmount - a.incorrectAnswersAmount)
    .map(item => item.id)

  const response = await client
    .get(`/words?filter[answer]=incorrect&limit=${topWordsAmount}`)
    .loginVia(user)
    .end()
  const incorrectWordsIds = response.body.map(word => word.id)
  response.assertStatus(200)
  assert.equal(response.body.length, topWordsAmount)
  assert.includeOrderedMembers(incorrectWordsIds, orderedWordsIdsWithIncorrectAnswers)
})

test('get top 10 correct words', async ({ client, assert }) => {
  await Database.truncate('answers')
  const topWordsAmount = 10
  const correctAnswersStart = 1
  const correctAnswersEnd = topWordsAmount + 5
  const createdWordsAmount = topWordsAmount * 2
  const user = await TestHelper.createUser()
  const wordsSeeder = new WordsSeeder()
  await wordsSeeder.run(createdWordsAmount)
  const words = await Database
    .select('id')
    .from('words')
    .orderByRaw('RANDOM()')
    .limit(topWordsAmount)
  const wordsIdsWithCorrectAnswers = []
  const answersPromises = []
  const numbersRange = shuffle(range(correctAnswersStart, correctAnswersEnd))

  words.map(word => {
    const correctAnswersAmount = numbersRange.shift()
    wordsIdsWithCorrectAnswers.push(
      {
        id: word.id,
        correctAnswersAmount
      })
    range(0, correctAnswersAmount).forEach(() => {
      answersPromises.push(Answer.create({
        word_id: word.id,
        user_id: user.id,
        correct: true
      }))
    })
  })
  await Promise.all(answersPromises)
  const orderedWordsIdsWithCorrectAnswers = wordsIdsWithCorrectAnswers
    .sort((a, b) => b.correctAnswersAmount - a.correctAnswersAmount)
    .map(item => item.id)

  const response = await client
    .get(`/words?filter[answer]=correct&limit=${topWordsAmount}`)
    .loginVia(user)
    .end()
  const correctWordsIds = response.body.map(word => word.id)
  response.assertStatus(200)
  assert.equal(response.body.length, topWordsAmount)
  assert.includeOrderedMembers(correctWordsIds, orderedWordsIdsWithCorrectAnswers)
})
