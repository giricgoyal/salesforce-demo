'use strict';

var rootRoutes = function(app) {
    var contentType = require('./middleware/errorHandler');
    app.use(contentType.handleContentType);

    app.use('/api/salesforce', require('./salesforce/route'));
};

module.exports = rootRoutes;