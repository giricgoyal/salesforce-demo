'use strict';

var mongoose = require('mongoose');

var commonModel = require('../common/model');
var utility = require('../common/utility');

var model = commonModel.extendBase();
model.add({
    pincode: {
        type: Number
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    area: {
        type: String
    }
});

var mongooseModel = mongoose.model('locations', model);

module.exports = mongooseModel;