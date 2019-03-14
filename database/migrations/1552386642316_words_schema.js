'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WordsSchema extends Schema {
  up () {
    this.create('words', (table) => {
      table.increments()
      table.string('word').notNullable()
      table.specificType('syllables', 'jsonb').notNullable()
      table.integer('syllables_amount').notNullable()
      table.integer('stressed_syllable').notNullable()
      table.string('ipa')
      table.text('definition')
      table.string('speech_part')
      table.string('list')
      table.timestamps()
    })
  }

  down () {
    this.drop('words')
  }
}

module.exports = WordsSchema
