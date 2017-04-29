"use strict";

const child_process = require('child_process')
const express       = require('express');
const router        = express.Router();

router
.get('/launch', (req, res) => {
  var worker = child_process.fork('./lib/start.js', [0])

  worker.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
})

module.exports = router