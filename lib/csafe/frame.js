'use strict'

const Dict = require('./dictionary')

/**
 * InvalidFrameError type.
 *
 * Thrown when a frame contains an invalid checksum. 
 */
class InvalidFrameError extends Error {}

/**
 * Frame event handler.
 * 
 * The FrameReader is responsible for processing raw
 * buffers into CSAFE frames, using the unique start/stop
 * flags as defined in the protocol.
 */
class Frame {
  constructor(buffer) {
    this.buffer = buffer

    if (this.isStuffed) {
      this.unstuff()
    }
    
    if (!this.validateChecksum()) {
      throw new InvalidFrameError('Checksum does not match.')
    }
  }
  
  /**
   * Returns the offset byte value for byte stuffing.
   */
  static stuffByte(byte) {
    return byte & 0xF
  }

  /**
   * Returns the real byte value for a stuffed byte.
   */
  static unstuffByte(byte) {
    return byte + 0xF0
  }

  /**
   * Generates a 1 byte XOR checksum for a byte array.
   */
  static checksumFromBytes(bytes) {
    let checksum = 0x00

    for (let i = 0; i < bytes.length; i++) {
      let byte = bytes[i] 
      checksum = checksum ^ byte
    }

    return checksum
  }

  /**
   * Frame type getter.
   */
  get type() {
    let startFlag = this.buffer[0]
    
    switch (startFlag) {
      case Dict.flags['ExtendedStartFlag']:
        return 'extended'
      case Dict.flags['StandardStartFlag']:
        return 'standard'
      default:
        throw new Error('Invalid or unknown startFlag for Frame.')
    }
  }

  /**
   * Frame contents getter.
   */
  get contents() {
    return this.buffer.slice(1, this.buffer.length - 2)
  }

  /**
   * Frame checksum getter.
   */
  get checksum() {
    return this.buffer[this.buffer.length - 2]
  }

  /**
   * Validates the frame checksum byte.
   */
  validateChecksum() {
    let startIdx = 1
    let endIdx = this.buffer.length - 2
    let checkBytes = this.buffer.slice(startIdx, endIdx)
    let validate = Frame.checksumFromBytes(checkBytes)

    return (this.checksum === validate)
  }

  /**
   * Determines if the frame has been byte-stuffed.
   */
  isStuffed() {
    return (this.buffer.indexOf(Dict.flags['StuffFlag']) > -1)
  }

  /**
   * Performs byte-stuffing on the frame.
   */
  stuff() {
    let startIdx = 1
    let endIdx = this.buffer.length - 1

    for (let i = startIdx; i <= endIdx; i++) {
      let byte = this.buffer[i]

      switch (byte) {
        case Dict.flags['ExtendedStartFlag']:
        case Dict.flags['StandardStartFlag']:
        case Dict.flags['StopFlag']:
        case Dict.flags['StuffFlag']:
          let bufferList = [
            this.buffer.slice(0, i),
            Buffer.from([Dict.flags['StuffFlag'], Frame.stuffByte(byte)]),
            this.buffer.slice(i + 1, this.buffer.length) 
          ]

          // Update with the new buffer, which now has a length of n + 1.
          this.buffer = Buffer.concat(bufferList, this.buffer.length + 1)        
          break

        default:
          break
      }
    }    
  }
  
  /** 
   * Reverses byte-stuffing on the frame.
   */
  unstuff() {
    let startIdx = 1
    let endIdx = this.buffer.length - 1

    for (let i = startIdx; i <= endIdx; i++) {
      if (this.buffer[i] === Dict.flags['StuffFlag']) {
        let bufferList = [
          this.buffer.slice(0, i),
          Buffer.from([Frame.unstuffByte(this.buffer[i + 1])]),
          this.buffer.slice(i + 2, this.buffer.length) 
        ]

        // Update with the new buffer, which now has a length of n - 1.
        this.buffer = Buffer.concat(bufferList, this.buffer.length - 1)
      }
    }
  }
}

module.exports = Frame
