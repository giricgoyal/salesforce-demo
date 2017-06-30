'use strict';


var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var RefreshStrategy = require('passport-oauth2-refresh');
var BearerStrategy = require('passport-http-bearer').Strategy;

var src = process.cwd() + '/src/';
var config = require(src + '../config/config');

var User = require(src + 'users/model');
var Client = require(src + 'users/clients/model');
var AccessToken = require(src + 'users/accessToken/model');
var RefreshToken = require(src + 'users/refreshToken/model');

passport.use(new BasicStrategy(
    function(username, password, done) {
        var objToFind = {};
        if (isNaN(username)) {
            objToFind.email = username;
        } else {
            objToFind.phonenumber = username;
        }
        User.findOne(objToFind, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            user.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    return done(err);
                }
                // Password did not match
                if (!isMatch) {
                    return done(null, false);
                }

                // Success
                return done(null, user);
            });
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        Client.findOne({
            clientId: clientId
        }, function(err, client) {
            if (err) {
                return done(err);
            }

            if (!client) {
                return done(null, false);
            }

            if (client.clientSecret !== clientSecret) {
                return done(null, false);
            }

            return done(null, client);
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, done) {
        AccessToken.findOne({
            token: accessToken
        }, function(err, token) {
            if (err) {
                return done(err);
            }

            if (!token) {
                return done(null, false);
            }

            if (Math.round((Date.now() - token.created) / 1000) > config.security.tokenLife) {
                AccessToken.remove({
                    token: accessToken
                }, function(err) {
                    if (err) {
                        return done(err);
                    }
                });

                return done(null, true, {
                    message: 'Token expired'
                });
            }

            User.findById(token.userId, function(err, user) {

                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }

                AccessToken.update({
                    token: accessToken
                }, {
                    $set: {
                        created: new Date(),
                        updatedOn: new Date()
                    }
                }).exec();

                var info = {
                    scope: '*'
                };
                done(null, user, info);
            });
        });
    }
));