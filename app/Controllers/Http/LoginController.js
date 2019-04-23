'use strict'

const User = use('App/Models/User')

class LoginController {
  async redirect ({ request, session, ally }) {
    const redirectUrl = request.input('redirectUrl')
    session.put('redirectUrl', redirectUrl)
    await ally.driver('google').redirect()
  }

  async login ({ request, response, session, ally, auth, view }) {
    const redirectUrl = session.get('redirectUrl')
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
      const token = await auth.generate(user)
      const redirectDestination = `${redirectUrl}?token=${token.token}`
      response.redirect(redirectDestination)
    } catch (error) {
      console.error(error)
      response.redirect(`${redirectUrl}?error=${error}`)
    }
  }
}

module.exports = LoginController
