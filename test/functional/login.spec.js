'use strict'

const { test, trait } = use('Test/Suite')('Login')
const Context = use('Adonis/Src/HttpContext')
const User = use('App/Models/User')
const ally = Context.getGetter('ally')

trait('Test/ApiClient')
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
  const email = 'user@domain.com'
  const token = 'zxc123qwerty'
  Context.getter('ally', () => fakeAlly(email, token))

  const response = await client.get('/authenticated/google').end()
  const user = await User.findBy('email', email)

  assert.equal(user.token, token)
  assert.equal(user.login_source, 'google')
  response.assertText('Logged in')

  Context.getter('ally', ally, true)
})
