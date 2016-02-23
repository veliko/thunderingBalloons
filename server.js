// server for thunderingBalloons project
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');//require postgres
var methodOverride = require('method-override');
var config = require('./config/config');
var env = config.development;

// Yelp.js functions
var searchYelp = require('./yelp');

//Apply modules to app
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

require('./app/routes.js')(app);//configure routes
app.set('view engine','ejs');
app.listen(port);

console.log("App started on port:",port);
exports = module.exports = app;
