'use strict'
const User = use('App/Models/User')

class TestHelper {
  static createUser ({ email } = {}) {
    return User.create({
      email: email || TestHelper.getUserEmail(),
      token: TestHelper.getUserToken()
    })
  }

  static getUserEmail () {
    return 'user@domain.com'
  }

  static getUserToken () {
    return 'zxc123qwerty'
  }

  static createWord () {}
}

module.exports = TestHelper
