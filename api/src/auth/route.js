'use strict';

// import npm modules
var express = require('express');
var router = express.Router();

// import project modules
var controller = require('./oauth2');

router.post('/token',
  function (req, res, next) {
    next();
  },
  controller.token
);

module.exports = router;
