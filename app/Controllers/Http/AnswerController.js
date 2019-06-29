'use strict'
const Word = use('App/Models/Word')
const Answer = use('App/Models/Answer')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with answers
 */
class AnswerController {
  /**
   * Show a list of all answers.
   * GET answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth }) {
    const { filter = {} } = request.get()
    let answers

    if (filter.statistics === 'user-day') {
      const query = await Database.raw(
        `
      select
      count(*) filter (where correct=true) as correct_answers,
      count(*) filter (where correct=false) as incorrect_answers,
      count(*) as answers_sum,
      to_char( date_trunc('day', created_at), 'YYYY-MM-DD') as date
      from answers
      where user_id=?
      group by date
      order by date;`,
        [auth.user.id]
      )
      answers = query.rows
    } else if (filter.statistics === 'day') {
      const query = await Database.raw(
        `
      select
      count(*) filter (where correct=true) as correct_answers,
      count(*) filter (where correct=false) as incorrect_answers,
      count(*) as answers_sum,
      to_char( date_trunc('day', created_at), 'YYYY-MM-DD') as date
      from answers
      group by date
      order by date;`
      )
      answers = query.rows
    }

    response.send(answers)
  }

  /**
   * Create/save a new answer.
   * POST answers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { wordId, answeredSyllable } = request.post()
    const word = await Word.findBy('id', wordId)
    const correct = word.stressed_syllable === answeredSyllable

    try {
      const answer = await Answer.create({
        user_id: auth.user.id,
        word_id: wordId,
        answered_syllable: answeredSyllable,
        correct
      })

      response.json({
        data: answer,
        text: 'Answer saved'
      })
    } catch (e) {
      console.log(e)
      response.json({
        text: 'Error while saving answer'
      })
    }
  }

  /**
   * Display a single answer.
   * GET answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {}

  /**
   * Update answer details.
   * PUT or PATCH answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a answer with id.
   * DELETE answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = AnswerController
