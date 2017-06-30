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
  },
  created: {
    type: Date,
    default: new Date()
  }
});

var mongooseModel = mongoose.model('accesstokens', model);

module.exports = mongooseModel;
