'use strict';

var Model = require('./model');
var ClientModel = require('./clients/model');
var HospitalModel = require('../hospitalClinic/model');
var PaymentsModel = require('../payments/model');
var payments = require('../payments/controller');
var utility = require('../common/utility');
var bcrypt = require('bcrypt-nodejs');
// var CryptoJS = require("crypto-js");
var otplib = require('otplib');
var textlocal = require('textlocal');

var controller = {};

var textlocalOptions = {
    username: 'giricgoyal@silicosense.com',
    hash: '',
    test: true
};

textlocal = textlocal(textlocalOptions);

controller.login = function(req, res, next) {
    var username = req.body.phonenumber;
    var password = req.body.password;

    var objToFind = {};
    objToFind.deletedOn = null;
    if (isNaN(username)) {
        objToFind.email = username;
    } else {
        objToFind.phonenumber = username;
    }

    var promise = Model.findOne(objToFind).exec();
    promise.then(function(result) {
            if (!result) {
                res.status(400).json({
                    message: 'User does not exist'
                });
            }

            var phonenumber = result.phonenumber;
            bcrypt.compare(password, result.password, function(err, isMatch) {
                if (err) {
                    res.status(400).json({
                        message: 'Error occured. Please try again.',
                        result: err
                    });
                } else if (isMatch) {
                    var clientObj = {
                        clientId: utility.generateRandomString(),
                        clientSecret: utility.generateRandomString(),
                    };

                    var promise = ClientModel.update({
                        phonenumber: phonenumber
                    }, {
                        $set: {
                            updatedOn: new Date(),
                            clientId: clientObj.clientId,
                            clientSecret: clientObj.clientSecret
                        }
                    }).exec();

                    var promiseHosp = HospitalModel.findOne({
                        deletedOn: null,
                        _id: result.hospitalId
                    }).exec();

                    Promise.all([promise, promiseHosp]).then((data) => {
                        res.status(200).json({
                            result: {
                                firstname: result.firstname,
                                lastname: result.lastname,
                                clientId: clientObj.clientId,
                                clientSecret: clientObj.clientSecret,
                                userId: result._id,
                                is_admin: result.admin,
                                access_type: result.access_type,
                                hospitalId: result.hospitalId,
                                hospitalName: result.hospitalId ? data[1].name : undefined
                            }
                        });
                    }, (err) => {
                        res.status(400).json({
                            message: 'Error Occured. Please try again.',
                            result: innererror
                        });
                    });
                } else {
                    res.status(401).json({
                        message: 'Invalid password.'
                    });
                }
            });
        },
        function(err) {
            res.status(400).json({
                message: 'Error Occured. Please try again.',
                result: err
            });
        });
};

controller.signup = function(req, res, next) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var phonenumber = req.body.phonenumber;
    var password = req.body.password;
    var email = req.body.email;

    var userobj = {
        firstname: firstname,
        lastname: lastname,
        phonenumber: phonenumber,
        password: password,
        email: email
    };

    userobj = new Model(userobj);

    var clientObj = {
        phonenumber: phonenumber,
        clientId: utility.generateRandomString(),
        clientSecret: utility.generateRandomString(),
    };

    clientObj = new ClientModel(clientObj);

    var clientPromise = clientObj.save();

    var userpromise = userobj.save();
    userpromise.then(function(result) {
        clientPromise.then(function(innerRes) {
            clientObj.userId = result._id;
            clientObj.isAdmin = result.admin;
            clientObj.access_type = result.access_type;

            //  utility.sendEmail('"apnaDoctor" <noreply@apnadoctor.online>', email, 'Welcome to apnaDoctor', 'Welcome to apnaDoctor', 'Your OTP is ' + code);

            res.status(200).json({
                message: 'Singup Successfull.',
                result: clientObj
            });
        }, function(err) {
            res.status(400).json({
                message: 'Cannot Singup.',
                result: err
            });
        });
    }, function(err) {
        res.status(400).json({
            message: 'Cannot Singup.',
            result: err
        });
    });
};

controller.getOne = function(req, res, next) {
    var id = req.params.id;
    var promise = Model.findOne({
        _id: id,
        deletedOn: null
    }).exec();
    promise.then(function(result) {
        res.status(200).json({
            result: result
        });
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

controller.deleteOne = function(req, res, next) {
    var id = req.params.id;
    var promise = Model.update({
        _id: id
    }, {
        $set: {
            updatedOn: new Date(),
            deletedOn: new Date()
        }
    }).exec();
    promise.then(function(result) {
        res.status(200).json({
            result: result
        });
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};


controller.requestOtp = function(req, res, next) {
    var totp = otplib.totp;
    var username = req.body.phonenumber;
    var objToFind = {};
    if (isNaN(username)) {
        objToFind.email = username;
    } else {
        objToFind.phonenumber = username;
    }
    objToFind.deletedOn = null;

    var promise = Model.findOne(objToFind).exec();
    promise.then(function(result) {
        var userId = result._id;
        var secret = totp.utils.generateSecret();
        var code = totp.generate(secret);

        utility.sendEmail('"apnaDoctor" <noreply@apnadoctor.online>', result.email, 'OTP for your account', 'Your OTP is ' + code, 'Your OTP is ' + code);

        var promise = Model.update({
            _id: userId
        }, {
            $set: {
                updatedOn: new Date(),
                secret: secret
            }
        }).exec();
        promise.then(function(result) {

            // send code in sms
            // textlocal.sendSMS(phonenumber, 'Your OTP is ' + code, 'TXTLCL', (resp) => {
            //   console.log(resp);
            // });

            res.status(200).json({
                result: {
                    _id: userId
                }
            });
        }, function(err) {
            res.status(400).json({
                result: err,
                message: 'An error occured.'
            });
        });
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};


controller.confirmOtp = function(req, res, next) {
    var totp = otplib.totp;
    var userId = req.body.userId;
    var code = req.body.otp;
    var promise = Model.findOne({
        deletedOn: null,
        _id: userId
    }).exec();
    promise.then(function(result) {
        var secret = result.secret;
        var status = totp.check(code, secret);

        if (status) {
            res.status(200).json({
                message: 'OTP match'
            });
        } else {
            res.status(400).json({
                message: 'OTP doesn\'t match'
            });
        }
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

controller.resetPassword = function(req, res, next) {
    var totp = otplib.totp;
    var userId = req.body.userId;
    var code = req.body.otp;
    var password = req.body.password;

    var promise = Model.findOne({
        deletedOn: null,
        _id: userId
    }).exec();
    promise.then(function(result) {
        var secret = result.secret;
        var status = totp.check(code, secret);
        var phonenumber = result.phonenumber;

        if (status) {
            var promise = Model.update({
                _id: userId
            }, {
                $set: {
                    updatedOn: new Date(),
                    secret: '',
                    password: password
                }
            }).exec();

            promise.then(function(updateresult) {

                var clientObj = {
                    clientId: utility.generateRandomString(),
                    clientSecret: utility.generateRandomString(),
                };

                var clientPromise = ClientModel.update({
                    phonenumber: phonenumber
                }, {
                    $set: {
                        updatedOn: new Date(),
                        clientId: clientObj.clientId,
                        clientSecret: clientObj.clientSecret
                    }
                }).exec();
                clientPromise.then(function(innerresult) {
                    console.log(innerresult);
                    res.status(200).json({
                        result: {
                            firstname: result.firstname,
                            lastname: result.lastname,
                            clientId: clientObj.clientId,
                            clientSecret: clientObj.clientSecret,
                            userId: result._id,
                            is_admin: result.admin,
                            access_type: result.access_type,
                            hospitalId: result.hospitalId
                        }
                    });
                }, function(innererror) {
                    res.status(400).json({
                        result: innererror,
                        message: 'An error occured.'
                    });
                });
            }, function(err) {
                res.status(400).json({
                    result: err,
                    message: 'An error occured.'
                });
            });
        } else {
            res.status(400).json({
                message: 'OTP doesn\'t match'
            });
        }
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

controller.profile = function(req, res, next) {
    var userId = req.params.userId;

    var promise = Model.findOne({
        deletedOn: null,
        _id: userId
    }).exec();

    promise.then(function(result) {
        if (!result) {
            res.status(400).json({
                message: 'User does not exist'
            });
        } else {
            var data = {
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                phonenumber: result.phonenumber
            };
            if (result.hospitalId) {
                var promise = HospitalModel.findOne({
                    deletedOn: null,
                    _id: result.hospitalId
                }).exec();
                promise.then(function(resultinner) {
                    data.hospitalName = resultinner.name;
                    data.type = resultinner.type;
                    data.pincode = resultinner.pincode;
                    data.city = resultinner.city;
                    res.status(200).json({
                        result: data
                    });
                }, function(err) {
                    res.status(400).json({
                        result: err
                    });
                });
            } else {
                res.status(200).json({
                    result: data
                });
            }
        }
    }, function(err) {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};


controller.saveBankDetails = function(req, res, next) {
    var params = req.body;
    params.userId = req.params.userId;
    payments.saveUserBankDetails(params, (result) => {
        res.status(200).json({
            result: 'Details saved successfully.'
        });
    }, (err) => {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

controller.getBankDetails = function(req, res, next) {
    var userId = req.params.userId;

    var promise = PaymentsModel.user.findOne({
        deletedOn: null,
        userId: userId
    }).exec();

    promise.then((resultPromise) => {
        if (!resultPromise) {
            res.status(400).json({
                message: 'User does not exist'
            });
            return;
        }
        res.status(200).json({
            result: {
                account_holder_name: resultPromise.first_name && resultPromise.last_name ? (resultPromise.first_name + " " + resultPromise.last_name) : '',
                account_number: resultPromise.account_number,
                ifsc_code: resultPromise.ifsc_code,
                phone: resultPromise.phone,
                bank_name: resultPromise.bank_name,
                email: resultPromise.email,
                location: resultPromise.location
            }
        });
    }, (err) => {
        res.status(400).json({
            result: err,
            message: 'An error occured.'
        });
    });
};

module.exports = controller;