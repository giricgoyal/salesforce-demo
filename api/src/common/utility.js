'use strict';

var randomstring = require("randomstring");
var merge = require("merge");
var config = require('../../config/config');
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: config.mailerConfig.host,
    port: config.mailerConfig.port,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: config.mailerConfig.username,
        pass: config.mailerConfig.password
    }
});


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

var sendEmail = function(from, to, subject, text, html) {
  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

var sendSms = function() {

};

module.exports = {
  regExps: regExps,
  generateRandomString: generateRandomString,
  mergeJson: mergeJson,
  sendEmail: sendEmail
};
