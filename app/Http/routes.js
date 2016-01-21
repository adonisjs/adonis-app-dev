'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Routes helps you in defining http endpoints/urls which will be used
| by outside world to interact with your application. Adonis has a
| lean and rich router to support various options out of the box.
|
*/
const Route = use('Route')

Route.group('capibilities', function () {

  Route.get('/', function * (request, response) {
    response.ok('i am done')
  })

  Route.get('/profile', function * (request, response) {
    switch (request.param('format')) {
      case '.json':
        response.ok({success: 'i am done'})
        break
      case '.html':
        response.ok('<h2>i am done</h2>')
        break
      default:
        response.ok('i am done')
    }
  }).formats(['json', 'html'])

  Route.get('/session', function * (request, response) {
    yield request.session.put('id', 1)
    response.route('get-session')
  })

  Route.get('/readSession', function * (request, response) {
    const id = yield request.session.get('id')
    response.ok(id)
  }).as('get-session')

  Route.get('/users', function * (request, response) {
    response.unauthorized('login first')
  })

  Route.resource('accounts', 'AccountsController')

}).prefix('/capibilities')
