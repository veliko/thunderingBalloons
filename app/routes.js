var User = require('./models/user');
var config = require('../config/config');
var env = config.development;
var pg = require('pg');
var Sequelize = require('sequelize');
var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});

//configure endpoints
module.exports = function(app){

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
  					username:'jeff'
  				}
  			})
  		}).then(function(result){
  			console.log('fetched from database: ',result);
  			res.json(result);
  		})
  });



};
