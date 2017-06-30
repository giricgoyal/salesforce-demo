'use strict';

var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.Promise = require('bluebird');

var session = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var config = require('./config/config');

var mongoUri = 'mongodb://' + config.mongodb.ip + '/' + config.mongodb.db;
console.log('connecting mongo @ ', mongoUri);
mongoose.connect(mongoUri);
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

var app = express();

app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(cors());

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

// Use the passport package in our application
require('./src/auth/auth');
app.use(passport.initialize());


// app.use(express.favicon(__dirname + '/public/favicon.ico'));
// app.use(express.static(__dirname + '/public'));

// require('./src/models/musician')
require('./src/routes')(app);

app.listen(config.server.port);
console.log('Listening on port ' + config.server.port + '...');
