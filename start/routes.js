'use strict'
const Helpers = use('Helpers')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('login/google', 'LoginController.redirect')
  .middleware(['guest'])
Route.get('authenticated/google', 'LoginController.login')
  .middleware(['guest'])

Route
  .resource('words', 'WordController')
  .apiOnly()
  .middleware('auth')

Route
  .resource('answers', 'AnswerController')
  .apiOnly()
  .middleware('auth')

Route.any('*', ({ response }) =>
  response.download(Helpers.publicPath('app.html')))
