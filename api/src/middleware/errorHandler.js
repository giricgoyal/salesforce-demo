'use strict';

var handler = {};

handler.handleContentType = function(req, res, next) {
    var type = req.get('Content-Type');

    var checkMethod = (['GET', 'DELETE'].indexOf(req.method) > -1);
    if (checkMethod || (type && (type.indexOf('application/json') > -1 || type.indexOf('application/x-www-form-urlencoded') > -1))) {
        next();
    } else {
        var response = {
            message: 'Invalid content type'
        };
        return res.status(406).send(response);
    }
};

module.exports = handler;