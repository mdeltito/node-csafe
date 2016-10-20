'use strict'

const CSAFE = require('../lib/csafe')
const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

describe('Frame', () => {
  it('deconstructs a given buffer', () => {
    let buffer = Buffer.from([0xF1, 0x80, 0x80, 0xF2])
    let frame = new CSAFE.Frame(buffer)

    expect(frame).to.have.property('type').and.to.eql('standard') 
    expect(frame).to.have.property('contents')
    expect(frame.contents).to.be.an.instanceOf(Buffer)
    expect(frame).to.have.property('checksum').and.to.eql(128)
    expect(frame.checksum).to.eql(128)
  })

  it('can stuff and unstuff a single byte', () => {
    let byte = 0xF1
    let stuffed = CSAFE.Frame.stuffByte(byte)

    expect(stuffed).to.eql(0x01)
    expect(CSAFE.Frame.unstuffByte(stuffed)).to.eql(byte)
  })
  
  it('unstuffs a given buffer when initialized', () => {
    let buffer = Buffer.from([0xF1, 0x80, 0xF3, 0x01, 0x71, 0xF2])
    let frame = new CSAFE.Frame(buffer)

    expect(frame.isStuffed()).to.be.false
  })

  it('can stuff the buffer', () => {
    let buffer = Buffer.from([0xF1, 0x80, 0xF1, 0x71, 0xF2])
    let frame = new CSAFE.Frame(buffer)

    expect(frame.isStuffed()).to.be.false
    frame.stuff()
    expect(frame.isStuffed()).to.be.true
    expect(frame.buffer.indexOf(CSAFE.Dictionary.flags['StuffFlag'])).to.be.above(0)
  })

  it('detects invalid checksums', () => {
    let buffer = Buffer.from([0xF1, 0x80, 0xF3, 0x01, 0x72, 0xF2])
    expect(() => {new CSAFE.Frame(buffer)}).to.throw(CSAFE.InvalidFrameError)
  })

})

describe('FrameReader', () => {
  it('should emit Frame instances', (done) => {
    let reader = new CSAFE.FrameReader
    let buffer = Buffer.from([241, 128, 128, 242])
    
    reader.on('frame', (frame) => {
      expect(frame).to.be.an.instanceOf(CSAFE.Frame)
      done()
    })
    reader.read(buffer)    
  })

  it('can read standard Frames', (done) => {
    let reader = new CSAFE.FrameReader
    let buffer = Buffer.from([241, 128, 128, 242])
    
    reader.on('frame', (frame) => {
      done()
    })
    reader.read(buffer)
  })

  it('can read Frames across multiple buffers', (done) => {
    let reader = new CSAFE.FrameReader
    let buffer1 = Buffer.from([241, 128, 128])
    let buffer2 = Buffer.from([242])
    
    reader.on('frame', (frame) => {
      done()
    })
    reader.read(buffer1)
    reader.read(buffer2)
  })
})

