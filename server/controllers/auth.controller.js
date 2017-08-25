/*!
 * ./server/controller/auth.controller.js
 * 
 * Backend Authentication controller
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

'use strict'

const mongoose = require('mongoose');
const passport = require('passport');
const HTTPError = require('http-errors');

var User = mongoose.model('User');

class Authentication {
    register(req, res) {
        const $body = req.body;

        console.log('USER INFO', { name: $body.name, email: $body.email, password: $body.password });

        const user = new User({
            name: $body.name,
            email: $body.email
        });
        user.setPassword($body.password);

        // saves the new user
        user.save()
            .then(() => {
                var token;
                token = user.generateJwt();
                console.log('TOKEN', token);
                res.status(200).json({
                    token: token
                });
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
    }

    login(req, res) {
		console.log('about to call authenticate')
        passport.authenticate('local', (err, user, info) => {
			console.log('err', err, 'user', user, 'info', info);
			if (err) {
				console.log('here')
                res.status(500).json({
                    error: err
                });
                return;
            }

            if (user) {
				console.log('here 2')
                let token = user.generateJwt();
                res.status(200).json({
                    token: token
                });
            } else {
				console.log('here 3')
                res.status(401).json(info);
            }
        })(req, res);
    }
}

module.exports = new Authentication();

// module.exports.register = (req, res) => {
// 	var $body = req.body,
// 		user = new User({
// 			name: $body.name,
// 			email: $body.email
// 		});
// 	user.setPassword($body.password);

// 	// saves the new user
// 	user.save()
// 		.then(() => {
// 			var token;
// 			token = user.generateJwt();
// 			res.status(200).json({
// 				token: token
// 			});
// 		})
// 		.catch((err) => {
// 			res.status(500).json({
// 				error: err
// 			});
// 		})
// }

// module.exports.login = (req, res) => {
// 	passport.authenticate('local', (err, user, info) => {
// 		if (err) {
// 			res.status(500).json({
// 				error: err
// 			});
// 			return;
// 		}

// 		if (user) {
// 			token = user.generateJwt();
// 			res.status(200).json({
// 				token: token
// 			});
// 		} else {
// 			res.status(401).json(info);
// 		}
// 	})(req, res);
// }