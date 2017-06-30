'use strict';

var mongoose = require('mongoose');

var commonModel = require('../../common/model');
var utility = require('../../common/utility');

// model
var model = commonModel.extendBase();
model.add({
  phonenumber: {
    type: String,
    unique: true,
    required: true
  },
  clientId: {
    type: String,
    unique: true,
    required: true
  },
  clientSecret: {
    type: String,
    required: true
  }
});


// indices
model.index({
  'phonenumber': 1
});

model.index({
  'clientId': 1
});

var mongooseModel = mongoose.model('clients', model);

module.exports = mongooseModel;
