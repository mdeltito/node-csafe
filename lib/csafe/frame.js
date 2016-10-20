'use strict'

const Dict = require('./dictionary')

class InvalidFrameError extends Error {}

class Frame {
  static stuffByte(byte) {
    return byte & 0xF
  }

  static unstuffByte(byte) {
    return byte + 0xF0
  }

  constructor(buffer) {
    this.buffer = buffer

    if (this.isStuffed) {
      this.unstuff()
    }
    
    if (!this.validateChecksum()) {
      throw new InvalidFrameError('Checksum does not match.')
    }
  }

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

  get contents() {
    return this.buffer.slice(1, this.buffer.length - 2)
  }

  get checksum() {
    return this.buffer[this.buffer.length - 2]
  }

  validateChecksum() {
    let checksum = this.checksum
    let startIdx = 1
    let endIdx = this.buffer.length - 2
    let validate = 0x00

    for (let i = startIdx; i < endIdx; i++) {
      let byte = this.buffer[i] 
      validate = validate ^ byte
    }

    return (checksum === validate)
  }

  isStuffed() {
    return (this.buffer.indexOf(Dict.flags['StuffFlag']) > -1)
  }

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
            this.buffer.slice(0, i), // grab the bytes prior to the byte to stuff
            Buffer.from([Dict.flags['StuffFlag'], Frame.stuffByte(byte)]), // add the stuff flag and the newly stuffed byte
            this.buffer.slice(i + 1, this.buffer.length) // grab the rest of the buffer after the 2-byte sequence 
          ]

          // Update with the new buffer, which now has a length of n + 1.
          this.buffer = Buffer.concat(bufferList, this.buffer.length + 1)        
          break

        default:
          break
      }
    }    
  }
  
  unstuff() {
    let startIdx = 1
    let endIdx = this.buffer.length - 1

    for (let i = startIdx; i <= endIdx; i++) {
      if (this.buffer[i] === Dict.flags['StuffFlag']) {
        let bufferList = [
          this.buffer.slice(0, i), // grab the bytes prior to the stuff flag
          Buffer.from([Frame.unstuffByte(this.buffer[i + 1])]), // take the byte after the stuff flag and unstuff
          this.buffer.slice(i + 2, this.buffer.length) // grab the rest of the buffer after the 2-byte sequence 
        ]

        // Update with the new buffer, which now has a length of n - 1.
        this.buffer = Buffer.concat(bufferList, this.buffer.length - 1)
      }
    }
  }
}

module.exports = Frame