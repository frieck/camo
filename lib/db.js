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
    } else {
        return Promise.reject(new Error('Unrecognized DB connection url (Only nedb:// accepted).'));
    }
};