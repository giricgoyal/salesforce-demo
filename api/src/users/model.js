'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var commonModel = require('../common/model');
var utility = require('../common/utility');

// model
var model = commonModel.extendBase();
model.add({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    match: utility.regExps.email
  },
  password: {
    type: String,
    required: true
  },
  phonenumber: {
    type: Number,
    unique: true,
    required: true
  },
  access_type: {
    type: String,
    required: true,
    default: 'patient'
  },
  admin: {
    type: Boolean,
    default: false
  },
  secret: {
    type: String
  },
  hospitalId: {
    type: String
  },
  docId: {
    type: String
  }
});


// indices
// model.index({
//   'email': 1
// });

model.index({
  'phonenumber': 1
});


// Execute before each user.save() call
var hashPass = function (callback) {
  var user = this;
  if (user.op === 'update') {
    if (!user._update.$set.password) {
      return callback();
    }
  } else {
    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();
  }

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err);

    var pass = user.op === 'update' ? user._update.$set.password : user.password;
    bcrypt.hash(pass, salt, null, function (err, hash) {
      if (err) return callback(err);
      if (user.op === 'update') {
        user._update.$set.password = hash;
      } else {
        user.password = hash;
      }

      callback();
    });
  });
};

model.pre('update', hashPass);
model.pre('save', hashPass);

model.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

var mongooseModel = mongoose.model('users', model);

module.exports = mongooseModel;
