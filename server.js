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
var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});

//Authtication modules
var passport = require('passport');
var flash = require('connect-flash');
var PassportLocalStrategy = require('passport-local').Strategy;

// var User = sequelize.define('User',
// {
// 	username: Sequelize.STRING,
// 	password: Sequelize.STRING
// });

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
require('./app/routes.js')(app);//configure routes
app.listen(port);

console.log("App started on port:",port);
exports = module.exports = app;



//var user = User.create({ username: "admin", password: "bolognese" });

//initialize connection to Postgres DB
//var sequelize = new Sequelize('postgres://user:password@localhost:5432/dbname');
//var client = new pg.Client(conString);

//attach auth modules to application
// app.use(cookieParser());
// app.use(session({secret:'thunderingBalloons'}));
// app.use(passport.initialize());
// app.use(passport.session());
//app.use(flash());
