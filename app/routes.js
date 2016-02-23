var User = require('./models/user');
var config = require('../config/config');
var env = config.development;
var pg = require('pg');
var flash = require('connect-flash');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});

//configure endpoints
module.exports = function(app){

  app.get('/', function(req,res){
    res.render('../views/index.ejs');
  });

  app.get('/login', function(req,res){
    //flash message to be implemented
    res.render('../views/login.ejs', {message:"Enter username and password"});

  });

  app.post('/login', function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    //fetch hashedpassword and salt for entered username
    sequelize.sync().then(function(){
      User.findOne({
        where:{'uid':username}
      }).then(function(result){
        bcrypt.compare(password, result.dataValues.password, function(err, res) {
          if(res){
            console.log("matched!");
          }else{
            console.log("try again");
          }
        });
      })
    });
  });

  app.get('/signup', function(req,res){
    console.log('Inside GET');
    res.render('../views/signup.ejs', {message:"Inside signup page"});
  });

  app.post('/signup', function(req,res){

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(req.body.password, salt, function(err, hash){
        sequelize.sync().then(function(){
          return User.create({
            uid:req.body.username,
            password:hash,
            salt:salt,
            createdAt:Date.now()
          });
        }).then(function(result){
          console.log('posted to database.');
          res.json("Created new user...");
        })
      })
    });
  });

  app.post('/', function(req,res){
    var id = req.body.id;
    sequelize.sync().then(function(){
      return User.findAll({
        where:{'id':id}
      });
    }).then(function(result){
      console.log('fetched from database: ',result);
      res.json(result);
    });
  });

  app.post('/create', function(req,res){
  	console.log('inside POST handler!!!');

  });

  app.get('/', function(req,res){
  	console.log('inside GET handler!!!');
  		sequelize.sync().then(function(){
  			return User.findAll()
  		}).then(function(result){
  			//console.log('fetched from database: ',result);
  			res.json(result);
  		});
  });
};
