'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUsersLoginSourceAndTokenSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.string('login_source')
      table.string('token')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('login_source')
      table.dropColumn('token')
    })
  }
}

module.exports = AddUsersLoginSourceAndTokenSchema
