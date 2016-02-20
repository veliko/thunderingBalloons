//server for thunderingBalloons project
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');//require postgres
var methodOverride = require('method-override');

//Authtication modules
var passport = require('passport');
var flash = require('connect-flash');
var PassportLocalStrategy = require('passport-local').Strategy;

//Apply modules to app
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));
require('./app/routes.js')(app);//configure routes
app.set('view engine','ejs');
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
