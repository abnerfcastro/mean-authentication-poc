/*!
 * ./server/controller/auth.controller.js
 * 
 * Backend Authentication controller
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email' // Overriding username field to use email instead
}, (email, password, done) => {
    User.findOne({
            email: email
        })
        .then(user => {
            // user not found
            if (!user) {
				console.log('IN PASSPORT', 'incorrect username');
                return done(null, null, {
                    message: 'Incorrect username.'
                });
            }
            // user was found, but password is incorrect
            if (!user.validPassword(password)) {
				console.log('IN PASSPORT', 'incorrect password');				
				return done(null, null, {
                    message: 'Incorrect password.'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        })
        .catch(err => {
			console.log('Database error', err.message);
            return done(err);
        });
}));