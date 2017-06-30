'use strict';

var mongoose = require('mongoose');

var commonModel = require('../common/model');
var utility = require('../common/utility');

// model
var userTokensModel = commonModel.extendBase();
userTokensModel.add({
  userId: { // docId
    type: String,
    unique: true,
    required: true
  },
  id: { // instamojo user id
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    match: utility.regExps.email,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: true
  },
  resource_uri: {
    type: String
  },
  promo_code: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  date_joined: {
    type: String
  },
  is_email_verified: {
    type: Boolean
  },
  is_phone_verified: {
    type: Boolean
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  public_phone: {
    type: String
  },
  public_email: {
    type: String
  },
  public_website: {
    type: String
  },
  kyc: {
    type: Array
  },
  tags: {
    type: Array
  },
  account_holder_name: {
    type: String
  },
  bank_name: {
    type: String
  },
  account_number: {
    type: String
  },
  ifsc_code: {
    type: String
  },
  updated_at: {
    type: String
  },
  user: {
    type: String
  },
  access_token: {
    type: String
  },
  token_type: {
    type: String
  },
  expires_in: {
    type: Number
  },
  token_expiry: {
    type: Date,
    default: new Date()
  },
  refresh_token: {
    type: String
  },
  scope: {
    type: String
  }
});

var paymentRequestModel = commonModel.extendBase();
paymentRequestModel.add({
  appointmentId: {
    type: String,
    unique: true,
    required: true
  },
  id: { // instamojo payment request id
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    match: utility.regExps.email
  },
  buyer_name: {
    type: String
  },
  amount: {
    type: String
  },
  purpose: {
    type: String
  },
  status: {
    type: String
  },
  payments: {
    type: Array
  },
  send_sms: {
    type: Boolean
  },
  send_email: {
    type: Boolean
  },
  sms_status: {
    type: String
  },
  email_status: {
    type: String
  },
  shorturl: {
    type: String
  },
  longurl: {
    type: String
  },
  redirect_url: {
    type: String
  },
  webhook: {
    type: String
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  modified_at: {
    type: Date,
    default: new Date()
  },
  resource_uri: {
    type: String
  },
  allow_repeated_payments: {
    type: Boolean
  },
  mark_fulfilled: {
    type: Boolean
  },
  currency: {
    type: String
  },
  fees: {
    type: String
  },
  payment_id: {
    type: String
  },
  fulfil_details: {
    type: Object
  },
  refund_details: {
    type: Object
  }

});


var mongooseUserTokensModel = mongoose.model('instamojo_user', userTokensModel);
var mongoosePaymentRequestModel = mongoose.model('instamojo_payment_request', paymentRequestModel);

module.exports = {
  user: mongooseUserTokensModel,
  paymentRequest: mongoosePaymentRequestModel
};
