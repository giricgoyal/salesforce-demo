/**
 * instamojo wrapper for v2 (marketplace)
 * 
 */
'use strict';

var request = require('request');

var instamojo = {};
var config = {
  apiHost: 'https://api.instamojo.com',
  client_id: '',
  client_secret: '',
  referrer: ''
};

/**
 * @method: init
 * @param: client_id, client_secret, referrer
 * client_id: String
 * client_secret: String
 * referrer: String
 */
instamojo.init = function (client_id, client_secret, referrer) {
  config.client_id = client_id;
  config.client_secret = client_secret;
  config.referrer = referrer;
};


/**
 * @method: sandboxMode
 * @param: val
 * val: Boolean // true = test api
 */
instamojo.sandboxMode = function (val) {
  if (val) {
    config.apiHost = "https://test.instamojo.com";
  }
}

var callRequest = function (path, payload, method, headers, callback) {
  var options = {
    url: config.apiHost + path,
    method: method,
    form: payload
  };

  if (headers) {
    options.headers = headers;
  }

  console.log('API:', options.method, options.url);
  request(options, callback);
};


/**
 * @method: applicationBasedAuthentication
 * @param: callback
 * callback: function
 */
instamojo.applicationBasedAuthentication = function (callback) {
  /**
   * Method: POST
   * payload: {
   *  client_id
   *  client_secret
   *  grant_type: 'client_credentials'
   * }
   * headers: None
   * path: '/oauth2/token/'
   */
  var path = "/oauth2/token/";
  var payload = {
    grant_type: 'client_credentials',
    client_id: config.client_id,
    client_secret: config.client_secret
  };
  var method = "POST";
  var headers = null;

  callRequest(path, payload, method, headers, callback);
};


/**
 * @method: userBasedAuthentication
 * @param: obj, callback
 * obj: {
 *  username: String
 *  password: String
 * }
 * callback: function
 */
instamojo.userBasedAuthentication = function (obj, callback) {
  /**
   * Method: POST
   * payload: {
   *  client_id
   *  client_secret
   *  grant_type: 'password',
   *  username
   *  password
   * }
   * headers: None
   * path: '/oauth2/token/'
   */
  var path = "/oauth2/token/";
  var payload = {
    grant_type: 'password',
    client_id: config.client_id,
    client_secret: config.client_secret,
    username: obj.username,
    password: obj.password
  };
  var method = 'POST';
  var headers = null;

  callRequest(path, payload, method, headers, callback);
};


/**
 * @method: refreshTokenBasedAuthentication
 * @param: obj, callback
 * obj: {
 *  refresh_token: String
 * }
 * callback: function
 */
instamojo.refreshTokenBasedAuthentication = function (obj, callback) {
  /**
   * Method: POST
   * payload: {
   *  client_id
   *  client_secret
   *  grant_type: 'refresh_token',
   *  refresh_token
   * }
   * headers: None
   * path: '/oauth2/token/'
   */

  var path = "/oauth2/token/";
  var payload = {
    grant_type: 'refresh_token',
    client_id: config.client_id,
    client_secret: config.client_secret,
    refresh_token: obj.refresh_token
  };
  var method = 'POST';
  var headers = null;

  callRequest(path, payload, method, headers, callback);
};


/**
 * @method: userSignup
 * @param: obj, callback
 * obj: {
 *  email: String email
 *  password: String
 *  phone: String
 *  token_type: String // application-based-authentication-token
 *  access_token: String // application-based-authentication-token
 * }
 * callback: function
 */
instamojo.userSignup = function (obj, callback) {
  /**
   * Method: POST
   * payload: {
   *  email
   *  password
   *  phone
   *  referrer
   * }
   * headers: {
   *    "Authorization": "Bearer <application-based-authentication-token>"
   * }
   * path: '/v2/users/'
   */

  var path = "/v2/users/";
  var payload = {
    email: obj.email,
    password: obj.password,
    phone: obj.phone,
    referrer: config.referrer
  };
  var method = 'POST';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};


/**
 * @method: updateUserDetails
 * @param: obj, callback
 * obj: {
 *  id: String
 *  first_name: String
 *  last_name: String
 *  location: String
 *  phone: String
 *  token_type: String // user-based-authentication-token
 *  access_token: String // user-based-authentication-token
 * }
 * callback: function
 */
instamojo.updateUserDetails = function (obj, callback) {
  /**
   * Method: PATCH
   * payload: {
   *  first_name
   *  last_name
   *  location
   *  phone
   * }
   * headers: {
   *    "Authorization": "Bearer <user-based-authentication-token>"
   * }
   * path: '/v2/users/:id'
   */

  var path = "/v2/users/" + obj.id + "/";
  var payload = {
    first_name: obj.first_name,
    last_name: obj.last_name,
    phone: obj.phone,
    location: config.location
  };
  var method = 'PATCH';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};


/**
 * @method: updateUserBankDetails
 * @param: obj, callback
 * obj: {
 *  id: String
 *  account_holder_name: String
 *  account_number: String
 *  ifsc_code: String
 *  token_type: String // user-based-authentication-token
 *  access_token: String // user-based-authentication-token
 * }
 * callback: function
 */
instamojo.updateUserBankDetails = function (obj, callback) {
  /**
   * Method: PUT
   * payload: {
   *  account_holder_name
   *  account_number
   *  ifsc_code
   * }
   * headers: {
   *    "Authorization": "Bearer <user-based-authentication-token>"
   * }
   * path: '/v2/users/:id/inrbankaccount'
   */

  var path = "/v2/users/" + obj.id + "/inrbankaccount/";
  var payload = {
    account_holder_name: obj.account_holder_name,
    account_number: obj.account_number,
    ifsc_code: obj.ifsc_code
  };
  var method = 'PUT';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};

/**
 * @method: createPaymentRequest
 * @param: obj, callback
 * obj: {
 *  amount: Double
 *  purpose: String
 *  buyer_name: String
 *  email: String
 *  phone: String
 *  redirect_url: String
 *  webhook: String
 *  allow_repeated_payments: Boolean
 *  partner_fee_type: "fixed" || "percent"
 *  partner_fee: Double
 *  send_email: Boolean
 *  send_sms: Boolean
 *  mark_fulfilled: Boolean
 *  token_type: String // user-based-authentication-token
 *  access_token: String // user-based-authentication-token
 * }
 * callback: function
 */
instamojo.createPaymentRequest = function (obj, callback) {
  /**
   * Method: POST
   * payload: {
   *  amount
   *  purpose
   *  buyer_name
   *  email
   *  phone
   *  redirect_url
   *  webhook
   *  allow_repeated_payments
   *  partner_fee_type
   *  partner_fee
   *  send_email
   *  send_sms
   *  mark_fulfilled
   * }
   * headers: {
   *    "Authorization": "Bearer <user-based-authentication-token>"
   * }
   * path: '/v2/payment_requests/'
   */

  var path = "/v2/payment_requests/";
  var payload = {
    amount: obj.amount,
    purpose: obj.purpose,
    buyer_name: obj.buyer_name,
    email: obj.email,
    phone: obj.phone,
    redirect_url: obj.redirect_url,
    webhook: obj.webhook,
    allow_repeated_payments: obj.allow_repeated_payments,
    partner_fee_type: obj.partner_fee_type,
    partner_fee: obj.partner_fee,
    send_email: obj.send_email,
    send_sms: obj.send_sms,
    mark_fulfilled: obj.mark_fulfilled
  };
  var method = 'POST';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};

/**
 * @method: getPaymentRequest
 * @param: obj, callback
 * obj: {
 *  id: String
 *  token_type: String // user-based-authentication-token
 *  access_token: String // user-based-authentication-token
 * }
 * callback: function
 */
instamojo.getPaymentRequest = function (obj, callback) {
  /**
   * Method: POST
   * payload: null
   * headers: {
   *    "Authorization": "Bearer <user-based-authentication-token>"
   * }
   * path: '/v2/payment_requests/:id'
   */

  var path = "/v2/payment_requests/" + obj.id;
  var payload = null;
  var method = 'GET';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};

/**
 * @method: createRefund
 * @param: obj, callback
 * obj: {
 *  payment_id: String
 *  type: String
 *  body: String
 *  refund_amount: String
 *  token_type: String // user-based-authentication-token
 *  access_token: String // user-based-authentication-token
 * }
 * callback: function
 */
instamojo.createRefund = function (obj, callback) {
  /**
   * Method: POST
   * payload: {
   *  type
   *  body
   *  refund_amount
   * }
   * headers: {
   *    "Authorization": "Bearer <user-based-authentication-token>"
   * }
   * path: '/v2/payments/:payment_id/refund/'
   */

  var path = "/v2/payments/" + obj.payment_id + "/refund/";
  var payload = {
    type: obj.type,
    body: obj.body,
    refund_amount: obj.refund_amount
  };
  var method = 'POST';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};


/**
 * @method: fulfilPayment
 * @param: obj, callback
 * obj: {
 *  payment_id: String
 *  token_type: String // user-based-authentication-token
 *  access_token: String // user-based-authentication-token
 * }
 * callback: function
 */
instamojo.fulfilPayment = function (obj, callback) {
  /**
   * Method: POST
   * payload: null
   * headers: {
   *    "Authorization": "Bearer <user-based-authentication-token>"
   * }
   * path: '/v2/payments/:payment_id/fulfil/'
   */

  var path = "/v2/payments/" + obj.payment_id + "/fulfil/";
  var payload = null;
  var method = 'POST';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};


/**
 * @method: createOrderUsingPaymentRequestId
 * @param: obj, callback
 * obj: {
 *  payment_request_id: String
 *  token_type: String // user-based-authentication-token
 *  access_token: String // user-based-authentication-token
 * }
 * callback: function
 */
instamojo.createOrderUsingPaymentRequestId = function (obj, callback) {
  /**
   * Method: POST
   * payload: {
   *  id
   * }
   * headers: {
   *    "Authorization": "Bearer <user-based-authentication-token>"
   * }
   * path: '/v2/gateway/orders/payment-request/'
   */

  var path = "/v2/gateway/orders/payment-request/";
  var payload = {
    id: obj.payment_request_id
  };
  var method = 'POST';
  var headers = {
    "Authorization": obj.token_type + " " + obj.access_token
  };

  callRequest(path, payload, method, headers, callback);
};


module.exports = instamojo;
