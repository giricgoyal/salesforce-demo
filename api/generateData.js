'use strict';

var express = require('express');
var mongoose = require('mongoose');
var Model = require('./src/users/model');
var ClientModel = require('./src/users/clients/model');
var LocationModel = require('./src/location/model');
var utility = require('./src/common/utility');
var async = require('async');

mongoose.Promise = require('bluebird');

var config = require('./config/config');
console.log('connecting to ', config.mongodb.ip, config.mongodb.db);
var mongoUri = 'mongodb://' + config.mongodb.ip + '/' + config.mongodb.db;
mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', function() {
    throw new Error('unable to connect to database at ' + mongoUri);
});

var addUser = function() {
    var userobj = {
        firstname: 'admin',
        lastname: 'admin',
        phonenumber: 9818827376,
        password: 'P@ssw0rd',
        email: 'giricgoyal@gmail.com',
        admin: true
    };

    var promise = Model.findOne({
        deletedOn: null,
        phonenumber: 9818827376
    }).exec();

    promise.then((response) => {
        if (response && response._id) {

            var promise = Model.update({
                phonenumber: 9818827376
            }, {
                $set: {
                    updatedOn: new Date(),
                    email: 'giricgoyal@gmail.com'
                }
            }).exec();

            promise.then((response) => {
                console.log('admin added');
            }, function(err) {
                console.error(err);
            });
        } else {

            userobj = new Model(userobj);

            var clientObj = {
                phonenumber: userobj.phonenumber,
                clientId: utility.generateRandomString(),
                clientSecret: utility.generateRandomString(),
            };

            clientObj = new ClientModel(clientObj);

            var clientPromise = clientObj.save();

            var userpromise = userobj.save();
            userpromise.then(function(result) {
                clientPromise.then(function(innerRes) {
                    console.log('added');
                }, function(err) {
                    console.error(err);
                });
            }, function(err) {
                console.error(err);
            });
        }
    });
};

addUser();