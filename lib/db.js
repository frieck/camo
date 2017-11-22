'use strict';

/**
 * Connect to current database
 *
 * @param {String} url
 * @param {Object} options
 * @returns {Promise}
 */
exports.connect = function(url, options) {
    if (url.indexOf('nedb://') > -1) {
        // url example: nedb://path/to/file/folder
        const NeDbClient = require('./clients/nedbclient');
        return NeDbClient.connect(url, options).then(function(db) {
            global.CLIENT = db;
            return db;
        });
    } else if(url.indexOf('mongodb://') > -1) {
        // url example: 'mongodb://localhost:27017/myproject'
        const MongoClient = require('./clients/mongoclient');
        return MongoClient.connect(url, options).then(function(db) {
            global.CLIENT = db;
            return db;
        });
    } else {
        return Promise.reject(new Error('Unrecognized DB connection url.'));
    }
};
