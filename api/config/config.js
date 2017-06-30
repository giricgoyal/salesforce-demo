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

var salesforce = {
    endpoint: 'https://ap5.salesforce.com',
    client_id: '3MVG9d8..z.hDcPI.N6z1Pfs.Thw0F8OwjIPYGQcoP8wKWEhC1rf5eH8tv6K_7LXNPANwYlytbjdnR0k2.FCU',
    client_secret: '8574525558393730183'
};

config.mongodb = mongodbConfig[env];
config.server = serverConfig[env];
config.salesforce = salesforce;

module.exports = config;