'use strict'

const { test, trait } = use('Test/Suite')('Answers')
const WordsSeeder = require('../../database/seeds/WordSeeder')
const Word = use('App/Models/Word')
const Database = use('Database')
const TestHelper = use('App/Services/TestHelper')
const random = require('lodash/random')
const range = require('lodash/range')
const format = require('date-fns/format')
const subDays = require('date-fns/sub_days')

trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('save answer with correct answer', async ({ client, assert }) => {
  const user = await TestHelper.createUser()
  const word = await Word.create({
    word: 'outer',
    syllables: JSON.stringify(['out', 'er']),
    syllables_amount: 2,
    stressed_syllable: 1
  })
  const answeredSyllable = word.stressed_syllable

  const response = await client
    .post('/answers')
    .loginVia(user)
    .send({
      wordId: word.id,
      answeredSyllable
    })
    .end()
  const answer = response.body.data

  response.assertStatus(200)
  assert.equal(answer.word_id, word.id)
  assert.equal(answer.user_id, user.id)
  assert.equal(answer.answered_syllable, word.stressed_syllable)
  assert.equal(answer.correct, true)
})

test('save answer with incorrect answer', async ({ client, assert }) => {
  const user = await TestHelper.createUser()
  const word = await Word.create({
    word: 'outer',
    syllables: JSON.stringify(['out', 'er']),
    syllables_amount: 2,
    stressed_syllable: 1
  })
  const answeredSyllable = word.stressed_syllable + 1

  const response = await client
    .post('/answers')
    .send({
      wordId: word.id,
      answeredSyllable
    })
    .loginVia(user)
    .end()
  const answer = response.body.data

  response.assertStatus(200)
  assert.equal(answer.word_id, word.id)
  assert.equal(answer.answered_syllable, answeredSyllable)
  assert.equal(answer.correct, false)
})

test('get answers statistics per day', async ({ client, assert }) => {
  await Database.truncate('answers')
  await Database.truncate('words')
  const createdWordsAmount = 40
  const user = await TestHelper.createUser()
  const wordsSeeder = new WordsSeeder()
  await wordsSeeder.run(createdWordsAmount)
  const words = await Database.select('id')
    .from('words')
    .orderByRaw('RANDOM()')
    .limit(100)
  const statistics = []
  const answerPromises = []
  const getRandomWordId = function () {
    const index = random(0, words.length - 1)
    return words[index].id
  }

  for (let i = 6; i >= 0; i--) {
    const createdDate = subDays(new Date(), i)
    const formattedDate = format(createdDate, 'YYYY-MM-DD')
    let correctAnswers = 0
    let incorrectAnswers = 0
    let answersSum = 0

    range(0, 5).forEach(() => {
      const answerResult = !!Math.round(Math.random())
      answerPromises.push(
        Database.table('answers').insert({
          word_id: getRandomWordId(),
          user_id: user.id,
          answered_syllable: 1,
          correct: answerResult,
          created_at: createdDate
        })
      )

      answersSum++
      if (answerResult) {
        correctAnswers++
      } else {
        incorrectAnswers++
      }
    })

    statistics.push({
      date: formattedDate,
      correct_answers: correctAnswers + '',
      incorrect_answers: incorrectAnswers + '',
      answers_sum: answersSum + ''
    })
  }

  await Promise.all(answerPromises)

  const response = await client
    .get(`/answers?filter[statistics]=day`)
    .loginVia(user)
    .end()
  response.assertStatus(200)
  assert.deepEqual(response.body, statistics)
})

test('throw error when saving incorrectly build answer', async ({
  client,
  assert
}) => {
  const user = await TestHelper.createUser()
  const response = await client
    .post('/answers')
    .send({
      wordId: -1,
      answeredSyllable: ''
    })
    .loginVia(user)
    .end()

  response.assertStatus(500)
})
