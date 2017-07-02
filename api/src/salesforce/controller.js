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

var oauth;
var controller = {};

controller.getLoginLink = function(req, res, next) {
    res.status(200).json({
        url: org.getAuthUri()
    });
};

controller.getTokens = function(req, res, next) {
    var code = req.query.code;
    
    if (!code) {
        res.status(400).json({
            message: 'Code is required.'
        });
        return;
    }

    org.authenticate({code: code}, function(err, resp){
        if(!err) {
            console.log('Access Token: ' + resp.access_token);
            oauth = resp;
            res.status(200).json({
                message: 'Authenticated'
            });
            return;
        } else {
            console.log('Error: ' + err);
            res.status(400).json({
                message: 'Error occured.',
                result: err
            });
            return;
        }
    });
}

controller.getEvents = function(req, res, next) {
    console.log(oauth);
    var q = 'Select * from Custom_Events_c';
    org.query({query: q}, function(err, resp) {
        if (!err) {
            res.status(200).json({
                result: resp
            });
        }
        else {
            res.status(400).json({
                message: 'Error occured',
                result: err
            });
        }
    })
};

module.exports = controller;