'use strict';

var utility = require('../common/utility');
var config = require('../../config/config');
var instamojo = require('../apis/instamojo');

var moment = require('moment');
var cryptoJs = require('crypto-js');

var InstamojoModel = require('./model');

var controller = {};

instamojo.init(config.instamojo.client_id, config.instamojo.client_secret, config.instamojo.referrer);
instamojo.sandboxMode(true);

var getUserTokens = function (userId, successfn, errorfn) {
  var promise = InstamojoModel.user.findOne({
    userId: userId,
    deletedOn: null
  }).exec();

  promise.then((res) => {
    var instamojoUserId = res.id;
    if (moment().isBefore(res.token_expiry)) {
      let obj = {
        id: instamojoUserId,
        token_type: res.token_type,
        access_token: res.access_token
      };

      successfn(obj);
      return;
    } else {
      let obj = {
        refresh_token: res.refresh_token
      };
      instamojo.refreshTokenBasedAuthentication(obj, (err, res, body) => {
        if (err || res.statusCode !== 200) {
          errorfn(err || body);
          return;
        }

        body = JSON.parse(body);
        body.updatedOn = new Date();

        let promise = InstamojoModel.user.update({
          userId: userId
        }, {
          $set: body
        }).exec();

        promise.then((resp) => {
          let obj = {
            id: instamojoUserId,
            token_type: body.token_type,
            access_token: body.access_token
          };
          successfn(obj);
          return;
        }, (err) => {
          errorfn(err);
          return;
        });
      });
    }
  }, (err) => {
    errorfn(err);
    return;
  });
};

var proceedToSaveInstamojoUser = function (params, successfn, errorfn, update) {
  // 1. Application based authentication
  instamojo.applicationBasedAuthentication((err, res, body) => {
    if (err || res.statusCode !== 200) {
      errorfn(err || body);
      return;
    }

    body = JSON.parse(body);

    let obj = {};
    obj.email = params.email;
    obj.password = params.password;
    obj.phone = params.phone;
    obj.token_type = body.token_type;
    obj.access_token = body.access_token;


    // 2. User Signup
    instamojo.userSignup(obj, (err, signupres, signupbody) => {
      if (err || signupres.statusCode !== 201) {
        errorfn(err || signupbody);
        return;
      }

      // 3. User based authentication
      let obj = {
        username: params.email,
        password: params.password
      };

      instamojo.userBasedAuthentication(obj, (err, userres, userbody) => {
        if (err || userres.statusCode !== 200) {
          errorfn(err || userbody);
          return;
        }

        // 4. Add to db
        let obj = utility.mergeJson(JSON.parse(signupbody), JSON.parse(userbody));

        obj.token_expiry = moment().add(obj.expires_in, 'seconds');
        if (!update) {
          obj.userId = params.userId;
          let instaUser = new InstamojoModel.user(obj);
          let promise = instaUser.save();
          promise.then((res) => {
            successfn(res.body);
          }, (err) => {
            errorfn(err);
            return;
          });
        } else {
          obj.updatedOn = new Date();
          let promise = InstamojoModel.user.update({
            userId: params.userId
          }, {
            $set: obj
          }).exec();
          promise.then((res) => {
            successfn(res.body);
          }, (err) => {
            errorfn(err);
            return;
          });
        }
      });
    });
  });
}

controller.addInstamojoUser = function (params, successfn, errorfn) {
  // 0. CHeck if user already exists in db using email
  InstamojoModel.user.findOne({
    deletedOn: null,
    userId: params.userId
  }).exec().then((result) => {
    if (!result) {
      proceedToSaveInstamojoUser(params, successfn, errorfn, false);
    } else {
      if (result.email === params.email) {
        successfn(result);
        return;
      } else {
        proceedToSaveInstamojoUser(params, successfn, errorfn, true);
      }
    }
  }, (err) => {
    errorfn(err);
    return;
  });
};

controller.saveUserBankDetails = function (params, successfn, errorfn) {
  // 1. Get user token
  getUserTokens(params.userId, (res) => {

    var instaObj = utility.mergeJson(res, params);

    // 2. Update user details
    instamojo.updateUserDetails(instaObj, (err, res, body) => {
      if (err || res.statusCode !== 200) { // TODO: 301 ??? check with instamojo
        errorfn(err || body);
        return;
      }

      var dbObj = JSON.parse(body);

      // 3. Update bank details
      instamojo.updateUserBankDetails(instaObj, (err, res, body) => {
        if (err || (res.statusCode !== 200 && res.statusCode !== 201)) {
          errorfn(err || body);
          return;
        }

        dbObj = utility.mergeJson(dbObj, JSON.parse(body));
        dbObj.updatedOn = new Date();

        // 4. Update db 
        let promise = InstamojoModel.user.update({
          userId: params.userId
        }, {
          $set: dbObj
        }).exec();

        promise.then((res) => {
          successfn(res);
          return;
        }, (err) => {
          errorfn(err);
          return;
        });
      });
    });
  }, (err) => {
    errorfn(err);
    return;
  })
};


controller.createPaymentRequest = function (params, successfn, errorfn) {
  // 1. Get user token
  getUserTokens(params.userId, (res) => {
    var instaObj = utility.mergeJson(res, params);

    // 2. Create Payment Request
    instamojo.createPaymentRequest(instaObj, (err, res, body) => {
      if (err || res.statusCode !== 201) {
        errorfn(err || body);
        return;
      }

      // 3. Save payment request details
      let dbObj = JSON.parse(body);
      dbObj.appointmentId = params.appointmentId;

      let promise = new InstamojoModel.paymentRequest(dbObj).save();
      promise.then((result) => {
        successfn(result);
        return;
      }, (err) => {
        errorfn(err);
        return;
      });
    });
  }, (err) => {
    errorfn(err);
    return;
  });
};

controller.fulfilPayment = function (params, successfn, errorfn) {
  instamojo.applicationBasedAuthentication((err, res, body) => {
    if (err || res.statusCode !== 200) {
      errorfn(err || body);
      return;
    }

    body = JSON.parse(body);

    let obj = {};
    obj.payment_id = params.payment_id;
    obj.token_type = body.token_type;
    obj.access_token = body.access_token;

    instamojo.fulfilPayment(obj, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        errorfn(err || body);
        return;
      }

      var objRes = JSON.parse(body);

      var paymentRequestPromise = InstamojoModel.paymentRequest.update({
        payment_id: obj.payment_id
      }, {
        $set: {
          fulfil_details: objRes,
          updatedOn: new Date()
        }
      }).exec();

      paymentRequestPromise.then((resp) => {
        successfn(resp);
        return;
      }, (err) => {
        errorfn(err);
        return;
      });
    });
  });
};

controller.createRefund = function (params, successfn, errorfn) {
  getUserTokens(params.userId, (userResp) => {
    let obj = {
      payment_id: params.payment_id,
      type: 'PTH',
      body: 'Cancelled by user. User plans changed.',
      refund_amount: params.amount
    };

    obj = utility.mergeJson(obj, userResp);

    instamojo.createRefund(obj, (err, resp, body) => {
      if (err || (resp.statusCode !== 200 && resp.statusCode !== 201)) {
        errorfn(err || body);
        return;
      }

      let objToSave = JSON.parse(body);

      let promise = InstamojoModel.paymentRequest.update({
        _id: params._id
      }, {
        $set: {
          refund_details: objToSave,
          updatedOn: new Date()
        }
      }).exec();

      promise.then((resp) => {
        successfn(resp);
        return;
      }, (err) => {
        errorfn(err);
        return;
      });
    });
  }, (err) => {
    errorfn(err);
  });
};

controller.instamojoWebhook = function (req, res, next) {
  var params = req.body;

  var promise = InstamojoModel.paymentRequest.update({
    id: params.payment_request_id
  }, {
    $set: {
      updatedOn: new Date(),
      payment_id: params.payment_id,
      curreny: params.currency,
      fees: params.fees,
      status: params.status
    }
  }).exec();

  promise.then((result) => {
    console.log('success');
    res.status(200).json({
      result: 'response stored'
    });
  }, (err) => {
    console.log(err);
    res.status(400).json({
      result: 'failed to update results'
    });
  });


  // HMAC not available in v2 so skipped and commented.
  /*
  // Retrieve hmac from body pf request
  console.log(params);
  var hmac_provided = params.mac;
  // delete mac from Object
  delete params.mac;
  // sort according to keys in asc order and concatenate values with '|'
  var keys = Object.keys(params);
  keys.sort();
  console.log(keys);
  var values = [];
  keys.forEach((key) => {
    if (params.hasOwnProperty(key)) {
      values.push(params[key]);
    }
  });
  var msg = values.join('|');

  var salt = config.instamojo.salt;
  console.log(values);
  console.log(msg, salt);
  // calculate hmac sha1 with the calculated msg and salt
  var hmac_calculated = cryptoJs.enc.Base64.stringify(cryptoJs.HmacSHA1(msg, salt));
  console.log(hmac_calculated, hmac_provided);
  // compare calculate and provided hmac
  if (hmac_calculated === hmac_provided) {
    // store in db
    var promise = InstamojoModel.paymentRequest.update({
      id: params.payment_request_id
    }, {
      $set: {
        updatedOn: new Date(),
        payment_id: params.payment_id,
        curreny: params.currency,
        fees: params.fees,
        status: params.status
      }
    }).exec();

    promise.then((result) => {
      console.log('success');
      res.status(200).json({
        result: 'response stored'
      });
    }, (err) => {
      console.log(err);
      res.status(400).json({
        result: 'failed to update results'
      });
    });
  } else {
    console.log('hmac dont match');
    res.status(400).json({
      result: 'hmac does not match'
    });
  }
  */
};

module.exports = controller;
