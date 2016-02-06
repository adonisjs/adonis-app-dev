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
  Route
    .get('/', 'RouteTestingController.index')

  Route
    .get('/profile', 'RouteTestingController.profile')
    .formats(['json', 'html'])

  Route
    .get('/session', 'RouteTestingController.session')

  Route
    .get('/readSession', 'RouteTestingController.read')
    .as('get-session')

  Route
    .get('/users', 'RouteTestingController.users')

  Route.resource('accounts', 'AccountsController')
}).prefix('/capibilities')

Route.group('flash', function () {
  Route
    .get('/', 'FlashTestingController.create')
  Route
    .post('/', 'FlashTestingController.store')
}).prefix('/flash')
