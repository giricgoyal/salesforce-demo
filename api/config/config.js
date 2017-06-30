'use strict';

var config = {};

var env = 'localhost';
// var env = 'staging';
// var env = 'live';

console.log('starting server on ' + env);

var mongodbConfig = {
    localhost: {
        ip: 'localhost',
        db: 'salesforce-demo'
    },
    staging: {
        ip: 'localhost',
        db: ''
    },
    live: {
        ip: 'localhost',
        db: ''
    }
};

var serverConfig = {
    localhost: {
        port: 3000
    },
    staging: {
        port: 3000
    },
    live: {
        port: 3001
    }
}

var security = {
    tokenLife: 10 * 24 * 60 * 60
};

var instamojo = {
    localhost: {
        client_id: '',
        client_secret: '',
        referrer: '',
        salt: '',
        xapi_key: '',
        xauth_token: ''
    },
    staging: {
        client_id: '',
        client_secret: '',
        referrer: '',
        salt: '',
        xapi_key: '',
        xauth_token: ''
    },
    live: {
        client_id: '',
        client_secret: '',
        referrer: '',
        salt: '',
        xapi_key: '',
        xauth_token: ''
    }
}


var mailerConfig = {
    localhost: {
        host: '',
        port: 26,
        username: '',
        password: '',
    },
    staging: {
        host: '',
        port: 26,
        username: '',
        password: '',
    },
    live: {
        host: '',
        port: 26,
        username: '',
        password: '',
    }
}

config.mongodb = mongodbConfig[env];
config.security = security;
config.instamojo = instamojo[env];
config.server = serverConfig[env];
config.mailerConfig = mailerConfig[env];

module.exports = config;