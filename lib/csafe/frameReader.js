'use strict'

const EventEmitter = require('events').EventEmitter
const Dict = require('./dictionary')
const Frame = require('./frame')
const Response = require('./response')

/**
 * Frame event handler.
 * 
 * The FrameReader is responsible for processing raw
 * buffers into CSAFE frames, using the unique start/stop
 * flags as defined in the protocol.
 */
class FrameReader extends EventEmitter {
  constructor() {
    super()
    this._frameBuffer = null
  }
  
  /**
   * Reads a buffer of data and processes it for frames.
   * 
   * @param {Buffer} buffer 
   */
  read(buffer) {
    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Invalid data passed to FrameReader, buffer expected.')
    }

    // Create a new frame buffer if start flag is detected.
    // TODO: Handle extended frames.
    let frameStartIdx = buffer.indexOf(Dict.flags['StandardStartFlag'])
    if (frameStartIdx > -1) {
      this._frameBuffer = buffer.slice(frameStartIdx)
    }
    // Append the new buffer to the existing frame buffer.
    else {
      let totalLength = this._frameBuffer.length + buffer.length
      this._frameBuffer = Buffer.concat([this._frameBuffer, buffer], totalLength) 
    }

    this.emitFrameIfComplete()
  }

  /**
   * Detects the end of a frame and emits a new Frame object when complete.
   */
  emitFrameIfComplete() {
    let stopFlagIdx = this._frameBuffer.indexOf(Dict.flags['StopFlag'])
    if (stopFlagIdx > -1) {
      this._frameBuffer = this._frameBuffer.slice(0, stopFlagIdx + 1)

      let frame = new Response(this._frameBuffer)
      this.emit('frame', frame)
      this._frameBuffer = null
    }
  }
}

module.exports = FrameReader
