'use strict'

class RouteTestingController {

  * index (request, response) {
    response.ok('i am done')
  }

  * profile (request, response) {
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
  }

  * session (request, response) {
    yield request.session.put('id', 1)
    response.route('get-session')
  }

  * read (request, response) {
    const id = yield request.session.get('id')
    response.ok(id)
  }

  * users (request, response) {
    response.unauthorized('login first')
  }

}

module.exports = RouteTestingController
