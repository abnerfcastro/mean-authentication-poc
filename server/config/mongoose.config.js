/*!
 * ./server/config/mongoose.config.js
 * 
 * Sets up the database connection and shutdown
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/mean-authentication-poc', {
    useMongoClient: true
});

// Connection Events
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to mongodb://localhost/mean-authentication-poc');
});

// Bring in Schemas and Models
require('../models/user.model');