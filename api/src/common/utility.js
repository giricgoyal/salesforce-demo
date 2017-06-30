'use strict';

var randomstring = require("randomstring");
var merge = require("merge");
var config = require('../../config/config');

var regExps = {
  onlyText: /[a-zA-Z]+/,
  email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
};

var generateRandomString = function () {
  return randomstring.generate();
}

var mergeJson = function (obj1, obj2) {
  return merge(obj1, obj2);
}

module.exports = {
  regExps: regExps,
  generateRandomString: generateRandomString,
  mergeJson: mergeJson
};
