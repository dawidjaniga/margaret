'use strict'

/*
|--------------------------------------------------------------------------
| WordSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Word = use('App/Models/Word')
const words = require('../files/words.json')

class WordSeeder {
  async run (wordsAmount) {
    let wordsKeys = Object.keys(words)

    if (wordsAmount) {
      wordsKeys = wordsKeys.slice(0, wordsAmount)
    }

    await Promise.all(wordsKeys.map(this.createWord))
  }

  async createWord (key) {
    const wordData = words[key]
    const word = new Word()

    word.word = wordData.word
    word.syllables = JSON.stringify(wordData.syllables)
    word.syllables_amount = wordData.syllablesNum
    word.stressed_syllable = wordData.stressedSyllable
    word.ipa = wordData.IPA
    word.definition = wordData.definition
    word.speech_part = wordData.partOfSpeech
    word.list = wordData.liste

    return word.save()
  }
}

module.exports = WordSeeder
