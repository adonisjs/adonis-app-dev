'use strict'

class BodyParserTestingController {

  * getForm (request, response) {
    yield response.sendView('bp/form')
  }

  * postForm (request, response) {
    response.send(request.all())
  }

}

module.exports = BodyParserTestingController
