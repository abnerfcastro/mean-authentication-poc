/*!
 * ./server/routes/profile.js
 *
 * Defines routes for profile page
 * Author: Abner Castro
 * Date: August 23nd, 2017
 */

'use strict'

const express = require('express');
const jwt = require('express-jwt');

const CheckJwtMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var router = express.Router();

router.get('/partials/profile', CheckJwtMiddleware, (req, res) => {
    console.log('Protected route');
    res.render('partials/profile');
})

module.exports = router;