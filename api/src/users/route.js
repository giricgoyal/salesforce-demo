'use strict';

// import npm modules
var express = require('express');
var router = express.Router();
var passport = require('passport');

// import project modules
var controller = require('./controller');

router.post('/signup',
  function (req, res, next) {
    next();
  },
  controller.signup
);

router.post('/login',
  function (req, res, next) {
    next();
  },
  controller.login
);

router.post('/otp/request',
  function (req, res, next) {
    next();
  },
  controller.requestOtp
);

router.post('/otp/confirm',
  function (req, res, next) {
    next();
  },
  controller.confirmOtp
);

router.post('/reset-password',
  function (req, res, next) {
    next();
  },
  controller.resetPassword
);

router.get('/profile/:userId',
  passport.authenticate('bearer', {
    session: false
  }),
  (req, res, next) => {
    next();
  },
  controller.profile
);

router.post('/profile/:userId/bank-details',
  passport.authenticate('bearer', {
    session: false
  }),
  (req, res, next) => {
    next();
  },
  controller.saveBankDetails
);


router.get('/profile/:userId/bank-details',
  passport.authenticate('bearer', {
    session: false
  }),
  (req, res, next) => {
    next();
  },
  controller.getBankDetails
);

module.exports = router;
