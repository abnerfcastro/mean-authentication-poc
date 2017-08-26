/*!
 * ./server/routes/index.js
 *
 * Defines basic webserver routes
 * Author: Abner Castro
 * Date: August 23nd, 2017
 */

'use strict'

const express = require('express');

var router = express.Router();

const AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;