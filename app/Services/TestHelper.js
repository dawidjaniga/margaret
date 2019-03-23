'use strict'
const User = use('App/Models/User')

class TestHelper {
  static createUser () {
    return User.create({
      email: TestHelper.getUserEmail(),
      token: TestHelper.getUserToken()
    })
  }

  static getUserEmail () {
    return 'user@domain.com'
  }

  static getUserToken () {
    return 'zxc123qwerty'
  }
}

module.exports = TestHelper
