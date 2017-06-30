'use strict';

// import npm modules
var express = require('express');
var passport = require('passport');
var router = express.Router();

// import project modules
var controller = require('./controller');

router.post('/webhook/instamojo',
  function (req, res, next) {
    next();
  },
  controller.instamojoWebhook
);

module.exports = router;
