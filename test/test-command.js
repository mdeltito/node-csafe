'use strict'

const CSAFE = require('../lib/csafe')
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

describe('Command', () => {

  it('can generate a command frame', () => {
    let command = new CSAFE.Command('GetStatus')
    let expected = Buffer.from([0xF1, 0x80, 0x80, 0xF2])

    expect(command).to.be.an.instanceof(CSAFE.Frame)
    expect(command.buffer).to.be.eql(expected)
  })

  it('can add data for long-type frames', () => {
    let command = new CSAFE.Command('PMGetStrokeState', [0x09, 0x90])
    let expected = Buffer.from([0xF1, 0xBF, 0x02, 0x09, 0x90, 0x24, 0xF2])

    expect(command).to.be.an.instanceof(CSAFE.Frame)
    expect(command.buffer).to.be.eql(expected)
  })

})
