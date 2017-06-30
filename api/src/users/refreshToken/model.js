'use strict';

var mongoose = require('mongoose');

var commonModel = require('../../common/model');
var utility = require('../../common/utility');

// model
var model = commonModel.extendBase();
model.add({
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  }
});

var mongooseModel = mongoose.model('refreshtokens', model);

module.exports = mongooseModel;
