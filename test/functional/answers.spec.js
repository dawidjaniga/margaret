'use strict'

const { test, trait } = use('Test/Suite')('Answers')
const Word = use('App/Models/Word')
const TestHelper = use('App/Services/TestHelper')

trait('Auth/Client')
trait('Session/Client')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('save answer with correct answer', async ({ client, assert }) => {
  const user = await TestHelper.createUser()
  const word = await Word.create({
    word: 'outer',
    syllables: JSON.stringify([
      'out',
      'er'
    ]),
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
    syllables: JSON.stringify([
      'out',
      'er'
    ]),
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

test('throw error when saving incorrectly build answer', async ({ client, assert }) => {
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
