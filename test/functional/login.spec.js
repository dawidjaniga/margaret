'use strict'

const { test, trait } = use('Test/Suite')('Login')
const Context = use('Adonis/Src/HttpContext')
const User = use('App/Models/User')
const ally = Context.getGetter('ally')
const TestHelper = use('App/Services/TestHelper')

trait('Test/ApiClient')
trait('Session/Client')
trait('DatabaseTransactions')

function fakeAlly (email, token) {
  return {
    driver () {
      return {
        getUser: () => ({
          getEmail () {
            return email
          },

          getAccessToken () {
            return token
          }
        })
      }
    }
  }
}

test('redirect to Google Console login', async ({ assert, client }) => {
  const response = await client.get('/login/google').end()
  response.assertRedirect('/ServiceLogin')
})

test('login user after success callback', async ({ assert, client }) => {
  const email = TestHelper.getUserEmail()
  const token = TestHelper.getUserToken()
  Context.getter('ally', () => fakeAlly(email, token))

  const redirectUrl = '/destination-url'
  const response = await client
    .get('/authenticated/google')
    .session('redirectUrl', redirectUrl)
    .end()
  const user = await User.findBy('email', email)

  assert.equal(user.token, token)
  assert.equal(user.login_source, 'google')
  response.assertRedirect(redirectUrl)

  Context.getter('ally', ally, true)
})
