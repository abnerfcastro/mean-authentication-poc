/*!
 * ./server/controller/auth.controller.js
 * 
 * Backend Authentication controller
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

var mongoose = require('mongoose');
var passport = require('passport');

var User = mongoose.model('User');

module.exports.register = (req, res) => {
    var $body = req.body,
        user = new User({
            name: $body.name,
            email: $body.email
        });
    user.setPassword($body.password);
    
    // saves the new user
    user.save()
        .then(() => {
            var token;
            token = user.generateJwt();
            res.status(200).json({
                token: token
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err                
            });
        })
}

module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res.status(500).json({
                error: err
            });
            return;
        }
        
        if (user) {
            token = user.generateJwt();
            res.status(200).json({
                token: token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
}