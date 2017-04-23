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
const querystring = require('querystring')
const prefix = '/flash'

Browser.localhost('localhost', 3333)

test('should flash messages back to session', function * (t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/')
  browser.assert.attribute('form', 'method', 'POST')
  browser.fill('name', 'doe')
  browser.fill('email', 'doe@bar.com')
  yield browser.pressButton('Submit')
  const session = JSON.parse(querystring.unescape(browser.getCookie('adonis-session')).replace('j:', ''))
  expect(session.flash_messages).to.be.an('object')
  var flashValues = JSON.parse(session.flash_messages.d)
  expect(flashValues).to.be.an('object')
  expect(flashValues.name).to.equal('doe')
  expect(flashValues.email).to.equal('doe@bar.com')
  expect(flashValues.error).to.equal('All fields are required')
})

test('should remove flash messages after single refresh', function * (t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/')
  browser.assert.attribute('form', 'method', 'POST')
  browser.fill('name', 'doe')
  browser.fill('email', 'doe@bar.com')
  yield browser.pressButton('Submit')
  const session = JSON.parse(querystring.unescape(browser.getCookie('adonis-session')).replace('j:', ''))
  const browserRe = new Browser()
  yield browserRe.visit(prefix + '/')
  const sessionRe = JSON.parse(querystring.unescape(browserRe.getCookie('adonis-session')).replace('j:', ''))
  expect(session.flash_messages).to.be.an('object')
  expect(sessionRe.flash_messages).to.equal(undefined)

})
