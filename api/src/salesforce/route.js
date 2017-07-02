'use strict';

// import npm modules
var express = require('express');
var router = express.Router();
var passport = require('passport');

// import project modules
var controller = require('./controller');

router.get('/login-link', 
    function(req, res, next) {
        next();
    },
    controller.getLoginLink
);

router.get('/token?:code',
    function(req, res, next) {
        next();
    },
    controller.getTokens
);

router.get('/events',
    function(req, res, next) {
        next();
    },
    controller.getEvents
);

module.exports = router;
