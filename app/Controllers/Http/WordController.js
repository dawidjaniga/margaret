'use strict'
const Word = use('App/Models/Word')
const config = use('Config').get('words')
const Database = use('Database')
const shuffle = require('lodash/shuffle')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with words
 */
class WordController {
  /**
   * Show a list of all words.
   * GET words
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const { filter = {}, limit } = request.get()
    const wordsLimit = limit || config.defaultLimit
    let words

    if (filter.level === 'difficult') {
      const wordsPerLesson = 100
      const difficultWords = await Database.raw(`
      select words.* from words right join (select word_id, count(id) as amount from answers where correct=false group by word_id, correct order by amount desc) as incorrectAnswers on words.id=incorrectAnswers.word_id limit 50;`)
      const randomWordsAmount = wordsPerLesson - difficultWords.rows.length
      const randomWords = await Database.raw(`
      select * from words order by random() limit ?;`, [randomWordsAmount])
      words = shuffle(difficultWords.rows.concat(randomWords.rows))
    } else if (filter.answer === 'incorrect') {
      const difficultWords = await Database.raw(`
      select words.*, incorrectAnswers.amount from words right join (select word_id, count(id) as amount from answers where correct=false and user_id=? group by word_id, correct order by amount desc) as incorrectAnswers on words.id=incorrectAnswers.word_id order by amount desc limit ?;`,
      [auth.user.id, wordsLimit]
      )
      words = difficultWords.rows
    } else if (filter.answer === 'correct') {
      const difficultWords = await Database.raw(`
      select words.*, incorrectAnswers.amount from words right join (select word_id, count(id) as amount from answers where correct=true and user_id=? group by word_id, correct order by amount desc) as incorrectAnswers on words.id=incorrectAnswers.word_id order by amount desc limit ?;`,
      [auth.user.id, wordsLimit]
      )
      words = difficultWords.rows
    } else {
      words = await Word.pick(wordsLimit)
    }

    response.send(words)
  }

  /**
   * Render a form to be used for creating a new word.
   * GET words/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new word.
   * POST words
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single word.
   * GET words/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing word.
   * GET words/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update word details.
   * PUT or PATCH words/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a word with id.
   * DELETE words/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = WordController
