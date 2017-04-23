'use strict'

/**
 * adonis-framework
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const chai = require('chai')
const expect = chai.expect
const Browser = require('zombie')
const test = require('ava')
const prefix = '/capibilities'

Browser.localhost('localhost', 3333)

Browser.Pipeline.addHandler(function (browser, request, response) {
  browser.getHeader = function (key) {
    const headers = response.headers._headers
    let headerValue = ''
    headers.forEach(function (item) {
      if(item[0] === key) {
        headerValue = item[1]
      }
    })
    return headerValue
  }
  return response
})

test('should respond to a given route', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/')
  expect(browser.text()).to.equal('i am done')
  expect(browser.getHeader('content-type')).to.equal('text/html; charset=utf-8')
})

test('should send html when route ends with .html', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/profile.html')
  expect(browser.html()).to.equal('<html><head></head><body><h2>i am done</h2></body></html>')
  expect(browser.getHeader('content-type')).to.equal('text/html; charset=utf-8')
})

test('should send json when route ends with .json', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/profile.json')
  expect(browser.text()).to.equal(JSON.stringify({success: 'i am done'}))
  expect(browser.getHeader('content-type')).to.equal('application/json')
})

test('should plain text when there is not extension', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/profile')
  expect(browser.text()).to.equal('i am done')
  expect(browser.getHeader('content-type')).to.equal('text/html; charset=utf-8')
})

test('should set and get session using a redirect', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/session')
  expect(browser.text()).to.equal('1')
})

test('should deny a request using 401 status', function *(t) {
  const browser = new Browser()
  try {
    yield browser.visit(prefix + '/users')
  } catch (e) {
    browser.assert.status(401)
  }
})

test('should respond from resource index method', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/accounts')
  browser.assert.text('body', 'listing accounts')
})

test('should show create form to create an account', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/accounts/create')
  browser.assert.attribute('form', 'method', 'post')
  browser.assert.attribute('form', 'action', prefix+'/accounts')
  browser.fill('account_name', 'sales')
  browser.fill('account_id', 1)
  yield browser.pressButton('Create Account')
  const accountDetails = JSON.parse(browser.text())
  expect(accountDetails.account_name).to.equal('sales')
  expect(accountDetails.account_id).to.equal('1')
})

test('should respond from resource show method', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/accounts/1')
  browser.assert.text('body', 'showing an account')
})

test('should show edit form with existing values to edit an account', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/accounts/1/edit')
  browser.assert.attribute('form', 'method', 'post')
  browser.assert.attribute('form', 'action', prefix+'/accounts/1?_method=PUT')
  browser.assert.input('form input[name=account_name]', 'sales')
  browser.assert.input('form input[name=account_id]', '1')

  browser.fill('account_name', 'support')
  browser.fill('account_id', 1)
  yield browser.pressButton('Update Account')
  const accountDetails = JSON.parse(browser.text())
  expect(accountDetails.account_name).to.equal('support')
  expect(accountDetails.account_id).to.equal('1')
})

test('should respond from resource delete method', function *(t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/accounts/1?_method=DELETE')
  browser.assert.text('body', 'destroying an account')
})

