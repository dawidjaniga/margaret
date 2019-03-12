'use strict'

const { test, trait } = use('Test/Suite')('Login')
const { ioc } = use('@adonisjs/fold')

trait('Test/ApiClient')

test('redirect to Google Console login', async ({ assert, client }) => {
  const response = await client.get('/login/google').end()
  response.assertRedirect('/ServiceLogin')
})

// @todo
test('login user after success callback', async ({ assert, client }) => {
  ioc.fake('Adonis/Addons/Ally', () => {
    console.log('ally fakes')
    return {
      driver () {
        const getUser = {
          getEmail () {
            return 'user@werty.pl'
          },

          getAccessToken () {
            return '123adsv'
          }
        }

        return {
          getUser
        }
      }
    }
  })

  const response = await client.get('/authenticated/google').end()
  response.assertText('Logged in')
})

test('fail login', async ({ assert, client }) => {
  const response = await client.get('/authenticated/google').end()
  response.assertText('Unable to authenticate. Try again later')
})
