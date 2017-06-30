'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var base = {
    createdOn: {
        type: Date
    },
    deletedOn: {
        type: Date,
        default: null
    },
    updatedOn: {
        type: Date,
        default: Date.now
    }
};


var extendBase = function() {
    var baseModel = new mongoose.Schema(base);
    baseModel.plugin(uniqueValidator);
    return baseModel;
};

module.exports = {
    extendBase: extendBase
};