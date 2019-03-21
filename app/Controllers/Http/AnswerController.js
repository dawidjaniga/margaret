'use strict'
const Word = use('App/Models/Word')
const Answer = use('App/Models/Answer')

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
  async index ({ request, response, view }) {
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
  async show ({ params, request, response, view }) {
  }

  /**
   * Update answer details.
   * PUT or PATCH answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a answer with id.
   * DELETE answers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = AnswerController
