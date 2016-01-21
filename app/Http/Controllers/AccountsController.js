'use strict'

class AccountsController {

    * index (request, response) {
      response.send('listing accounts')
    }
    * create (request, response) {
      const view = yield response.view('accounts/create')
      response.send(view)
    }
    * store (request, response) {
      response.send(request.all())
    }
    * show (request, response) {
      response.send('showing an account')
    }
    * edit (request, response) {
      const view = yield response.view('accounts/edit', {account_name: 'sales', id: 1})
      response.send(view)
    }
    * update (request, response) {
      response.send(request.all())
    }
    * destroy (request, response) {
      response.send('destroying an account')
    }
}

module.exports = AccountsController
