//server for thunderingBalloons project
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var pg = require('pg');
var port = process.env.PORT || 8080;

//initialize connection to Postgres DB
var conString = "postgres://postgres:password@localhost:5432/testdb";
//var sequelize = new Sequelize('postgres://user:password@localhost:5432/dbname');
var client = new pg.Client(conString);		

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public')); 
//require('./routes')(app); // configure our routes

app.listen(port);

  app.get('/', function(req,res){
  	console.log('inside GET handler!!!');
  	client.connect(function(err){
			if(err){
				return console.log("error connecting to the database",err);	
			}else{
				console.log('Connected to the database!');
				client.query('SELECT * from users', function(err,result){
					if(err) console.log("Error running query!");
					res.json(result.rows);
				});
			}	
	});	
  });


console.log("App started on port:",port);

exports = module.exports = app;