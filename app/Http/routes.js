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

/*
|--------------------------------------------------------------------------
| Routes Testing
|--------------------------------------------------------------------------
|
| Below are the registered routes to test routing capabilities of
| adonis framework
|
*/
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

/*
|--------------------------------------------------------------------------
| Flash Messages Testing
|--------------------------------------------------------------------------
|
| Below are the registered routes to test flash messages capabilities.
| Needs to have Adonis/Middleware/Flash inside kernel.js file for
| testing.
|
*/
Route.group('flash', function () {
  Route
    .get('/', 'FlashTestingController.create')
  Route
    .post('/', 'FlashTestingController.store')
}).prefix('/flash')


/*
|--------------------------------------------------------------------------
| BodyParser Testing
|--------------------------------------------------------------------------
|
| Below are the registered routes to test body parser capabilities.
| Needs to have Adonis/Middleware/BodyParser inside kernel.js
| file for testing.
|
*/
Route.group('bp', function () {
  Route
    .get('/form', 'BodyParserTestingController.getForm')
  Route
    .post('/form', 'BodyParserTestingController.postForm')
}).prefix('/bp')
