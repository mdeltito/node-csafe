'use strict'

let Dict = require('./dictionary')
let Frame = require('./frame')

/**
 * Command frame type.
 * 
 * A command frame is a request from the host/leader. Commands have 
 * one of two structures:
 *  - Long Command Structure for commands accompanied by data.
 *  - Short Command Structure for commands with no associated data.
 */
class Command extends Frame {
  constructor(commandName, data = []) {
    let buffer = Command.createBuffer(commandName, data)
    super(buffer)
  }

  /**
   * Creates a new buffer for the command to populate the underlying frame.
   * 
   * @param {string} commandName: The dictionary name of the command.
   * @param {data} data: an array of data to 
   */
  static createBuffer(commandName, data) {
    let startFlag = Dict.flags['StandardStartFlag']
    let stopFlag = Dict.flags['StopFlag']
    let command = Dict.commands[commandName]
    let bufferArray = [command.id]
    
    // If this is a long command (contains data), add the 
    // data byte count and data.
    if (command.type == 'long') {
      bufferArray.push(data.length)
      bufferArray = bufferArray.concat(data)
    }
    
    // Add checksum.
    let checksum = Frame.checksumFromBytes(bufferArray)
    bufferArray.push(checksum)

    // Add start/stop flags.
    bufferArray.unshift(startFlag)
    bufferArray.push(stopFlag)    

    return Buffer.from(bufferArray) 
  }
}

module.exports = Command
