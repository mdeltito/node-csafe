'use strict'

let lint = require('mocha-eslint')
let paths = [
  'lib/**/*',
]
 
let options = {
  strict: true 
}

lint(paths, options)
