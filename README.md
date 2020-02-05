# node-csafe

[![Build Status](https://travis-ci.org/mdeltito/node-csafe.svg?branch=master)](https://travis-ci.org/mdeltito/node-csafe)
[![npm version](https://badge.fury.io/js/csafe.svg)](https://badge.fury.io/js/csafe)

CSAFE protocol implementation for Node.js.

# Description

This library provides an implementation of the [CSAFE communication protocol](http://www.fitlinxx.com/csafe/) for exercise equipment and performance monitors. It provides an abstraction for the protocol's frame specification, a dictionary of standard CSAFE "commands", and a simple FrameReader for reading/emitting frames from a stream of bytes.

See also [node-concept2](https://github.com/mdeltito/node-concept2), which is a HID wrapper that enabled communication with [Concept2](https://www.concept2.com/) monitor devices using this protocol.   

# Installation

```sh
$ npm install --save csafe
```

# Example

```js
import { Command, FrameReader } from csafe

// Create a new 'GetCadance' command buffer.
// The resulting object contains a structured byte array that represents
// the raw command. Frames are automatically byte-stuffed/unstuffed to
// ensure control flags do not appear in the frame contents.
const command = new Command('GetCadence')

// Create a new FrameReader to read frames from a byte stream.
// The FrameReader is an EventEmitter that can read an arbitrary stream
// of bytes, detect the beginning/end of a Frame, and emit a new Frame
// object when a complete frame is received.
const frameReader = new FrameReader

// A readable `stream` is used as an example and typical use-case.
stream.on('data', (data) => {
  frameReader.read(data)
})

frameReader.on('frame', (frame) =>  {
  // ...
})
```

# Testing

```sh
$ npm test
```

# License

The project is licensed under the MIT license.
