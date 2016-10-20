'use strict'

const Frame = require('./frame');
const StatusLabel = [
  'prevOk',
  'prevReject',
  'prevBad',
  'prevNotReady'
]
const StateLabel = [
  'Error',
  'Ready',
  'Idle',
  'HaveId',
  null,
  'InUse',
  'Paused',
  'Finished',
  'Manual',
  'Offline'
]

/**
 * Response frame type.
 * 
 * A response frame is a reply from the client that contains 
 * a status byte and zero or more data structures. The only 
 * distinction of a response frame is the frame contents.
 * 
 * Frame contents for a Response are in the following format:
 *  - Status byte
 *  - 0-N data structures
 *    - id/command
 *    - byte count
 *    - data
 */
class Response extends Frame {
  constructor(buffer) {
    super(buffer)
  }

  /**
   * Gets status information from the status byte for
   * the previous frame.
   */
  get prevStatus() {
    let byte = this.contents[0]

    return  {
      value: (byte >> 4) & 0x03,
      label: StatusLabel[(byte >> 4) & 0x03]
    } 
  }

  /**
   * Gets state information from the status byte.
   */
  get state() {
    let byte = this.contents[0]
    
    return  {
      value: byte & 0x0F,
      label: StateLabel[byte & 0x0F]
    } 
  }

  /**
   * Gets data structures from frame contents.
   */
  get data() {
    let dataObjs = []
    let startIdx = 1
    
    for (let i = startIdx; i < this.contents.length; i++) {
      let d = { id: this.contents[i++] }
        , c = this.contents[i++]

      d.data = this.contents.slice(i, i + c)
      d.length = c
      i = i + c

      dataObjs.push(d)
    }

    return dataObjs
  }
}

module.exports = Response
