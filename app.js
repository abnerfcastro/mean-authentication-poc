/*!
 * app.js
 * 
 * Defines Express Web Server.
 * Author: Abner Castro
 * Date: August 22nd, 2017
 */

// Load .env variables
require('dotenv').config();

var path = require('path');
var bodyParser = require('body-parser');

var express = require('express'),
    app = express();

// Setting app properties
app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT);

if (app.get('env') === 'development') {
    // Apply these middlewares in development env
    console.log("Environment: " + app.get('env'));

    // Serve files from client folder in dev environment. Use minified versions in production.
    app.use(express.static(path.join(__dirname, 'client')));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Bring in Database models
require('./server/config/mongoose.config');

app.get('/partials/:name', (req, res) => {
    res.render('partials/' + req.params.name);
})

app.get('*', (req, res) => {
    res.render('index', {
        title: "MEAN Authentication with JWT"
    });
});

app.listen(app.get('port'), function () {
    console.log('Server has started on port ' + app.get('port'));
});