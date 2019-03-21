'use strict'
const User = use('App/Models/User')

class TestHelper {
  static createUser () {
    return User.create({
      email: 'user@domain.com'
    })
  }
}

module.exports = TestHelper
