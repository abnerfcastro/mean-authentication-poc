/*!
 * ./server/routes/dashboard.js
 *
 * Defines basic webserver routes
 * Author: Abner Castro
 * Date: August 25th, 2017
 */

'use strict'

const express = require('express');
const jwt = require('express-jwt');

const CheckJwtMiddleware = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const CheckAdminPermission = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        let payload = JSON.parse(new Buffer(token.split('.')[1], 'base64'));

        if (payload["role"] === "admin")
            next();
        else
            res.status(401).json({
                error: "Permission Denied."
            })
    } else {
        res.end('Not Authorized!');
    }
}

var router = express.Router();

router.get('/partials/dashboard', CheckJwtMiddleware, CheckAdminPermission, (req, res) => {
    res.render('partials/dashboard');
});

module.exports = router;