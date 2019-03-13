'use strict'

const User = use('App/Models/User')

class LoginController {
  async redirect ({ ally }) {
    await ally.driver('google').redirect()
  }

  async login ({ ally, auth }) {
    try {
      const googleUser = await ally.driver('google').getUser()

      const userDetails = {
        email: googleUser.getEmail(),
        token: googleUser.getAccessToken(),
        login_source: 'google'
      }

      const whereClause = {
        email: googleUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      await auth.login(user)

      return 'Logged in'
    } catch (error) {
      console.error(error)
      return 'Unable to authenticate. Try again later'
    }
  }
}

module.exports = LoginController
