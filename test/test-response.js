'use strict'

const CSAFE = require('../lib/csafe')
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

describe('Response', () => {
  let responseArray = [0xF1, 0x01, 0x91, 0x07, 0x16, 0x02, 0x03, 0x54, 0x01, 0x3B, 0x01, 0xEF, 0xF2]

  it('can deconstruct a given response frame buffer', () => {
    let buffer = Buffer.from(responseArray)
    let response = new CSAFE.Response(buffer)

    expect(response.data.length).to.be.eql(1)
    expect(response.data[0].length).to.be.eql(7)
    expect(response.data[0].id).to.be.eql(0x91)
  })

  it('can access status and state information', () => {
    let buffer = Buffer.from(responseArray)
    let response = new CSAFE.Response(buffer)

    expect(response.prevStatus.value).to.be.eql(0)
    expect(response.prevStatus.label).to.be.eql("prevOk")
    expect(response.state.value).to.be.eql(1)
    expect(response.state.label).to.be.eql("Ready")
  })

})
