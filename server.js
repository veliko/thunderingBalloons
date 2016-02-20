//server for thunderingBalloons project
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config/config');
var app = express();
var flash = require('flash');
var port = process.env.PORT || 8080;
var env = config.development;

//Database and ORM modules
var pg = require('pg');
var Sequelize = require('sequelize');

// Yelp.js functions
var searchYelp = require('./yelp');

var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});

var User = sequelize.define('User',
{
  username: Sequelize.STRING,
  password: Sequelize.STRING
})


//var user = User.create({ username: "admin", password: "bolognese" });

//Authtication modules
var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');

//initialize connection to Postgres DB
//var sequelize = new Sequelize('postgres://user:password@localhost:5432/dbname');
//var client = new pg.Client(conString);

//attach auth modules to application
// app.use(cookieParser());
// app.use(session({secret:'thunderingBalloons'}));
// app.use(passport.initialize());
// app.use(passport.session());
//app.use(flash());


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
//require('./routes')(app); // configure our routes

app.listen(port);

app.post('/create', function(req,res){
	console.log('inside POST handler!!!');
		sequelize.sync().then(function(){
			return User.create({
				username:req.body.username,
				password:req.body.password
			});
		}).then(function(result){
			console.log('posted to database: ',result);
			res.json(result);
		})
});

app.get('/', function(req,res){
	console.log('inside GET handler!!!');
		sequelize.sync().then(function(){
			return User.findAll({
				where:{
					username:'rohit'
				}
			})
		}).then(function(result){
			console.log('fetched from database: ',result);
			res.json(result);
		})
});

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
