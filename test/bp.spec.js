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
const prefix = '/bp'

Browser.localhost('localhost', 3333)

test('should be able to handle form-data requests', function * (t) {
  const browser = new Browser()
  yield browser.visit(prefix + '/form')
  browser.assert.attribute('form', 'method', 'POST')
  browser.fill('name', 'doe')
  browser.fill('email', 'doe@bar.com')
  browser.fill('password', 'secret')
  yield browser.pressButton('Submit')
  const formData = JSON.parse(browser.text())
  expect(formData).to.be.an('object')
  expect(formData.name).to.equal('doe')
  expect(formData.email).to.equal('doe@bar.com')
  expect(formData.password).to.equal('secret')
})

