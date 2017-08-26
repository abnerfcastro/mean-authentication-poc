/*!
 * ./server/models/user.model.js
 *
 * Defines User database schema with Mongoose
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    name: String,
    role: String,
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        email: this.email,
        name: this.name,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', userSchema);