'use strict';

var nforce = require('nforce');
// var Model = require('./model');
var utility = require('../common/utility');
var config = require('../../config/config');

var org = nforce.createConnection({
    clientId: config.salesforce.client_id,
    clientSecret: config.salesforce.client_secret,
    redirectUri: 'http://localhost:4200/auth/login/oauth/_callback',
    environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default 
    mode: 'multi' // optional, 'single' or 'multi' user mode, multi default 
});

var controller = {};

controller.getLoginLink = function(req, res, next) {
    res.status(200).json({
        url: org.getAuthUri()
    });
};

controller.getTokens = function(req, res, next) {
    var code = req.params.code;
    if (!code) {
        res.status(400).json({
            message: 'Code is required.'
        });
        return;
    }
    
}

module.exports = controller;