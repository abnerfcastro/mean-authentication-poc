/*!
 * ./server/routes/index.js
 *
 * Defines basic webserver routes
 * Author: Abner Castro
 * Date: August 23nd, 2017
 */

'use strict'

const express = require('express');
const jwt = require('express-jwt');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var router = express.Router();

router.get('/partials/profile', auth, (req, res) => {
	console.log('Protected route');
	res.render('partials/profile');	
})

router.get('/api/protected/example', auth, (req, res) => {
	res.json({
		name: "This is an example"
	});
})

module.exports = router;