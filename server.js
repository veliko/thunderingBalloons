//server for thunderingBalloons project
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

//Database and ORM modules
//var User = require('./models/user');
var pg = require('pg');
var Sequelize = require('sequelize');

// Yelp.js functions
var searchYelp = require('./yelp');

var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});

//Authtication modules
var passport = require('passport');
var flash = require('connect-flash');
var PassportLocalStrategy = require('passport-local').Strategy;

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

// get request from yelp
app.get('/places', function(req, res) {

 /* TODO: might need to change the request's data object */

 var term = req.headers.data.term;
 var lat = req.headers.data.lat;
 var lon = req.headers.data.lon;

 searchYelp(term, lat, lon, function(data){
   res.json(data);
 });
});

console.log("App started on port:",port);
exports = module.exports = app;
