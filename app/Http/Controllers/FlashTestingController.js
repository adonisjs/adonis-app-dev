'use strict'

class FlashTestingController {

  * create (request, response) {
    yield response.sendView('flash/create')
  }

  * store (request, response) {
    yield request.withAll().andWith({error: 'All fields are required'}).flash()
    response.send()
  }

}

module.exports = FlashTestingController
