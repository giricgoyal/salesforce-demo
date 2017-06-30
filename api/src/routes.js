'use strict';

var rootRoutes = function(app) {
    var contentType = require('./middleware/errorHandler');
    app.use(contentType.handleContentType);

    
};

module.exports = rootRoutes;