///////////////////
// signup router //
///////////////////

// dependencies
var bcrypt = require('bcrypt');

// create express router 
var express = require('express');
var signupRouter = express.Router();

// db helpers
var config = require('../db/config/config');
var env = config.development;
var Sequelize = require('sequelize');
var conString = env.dialect+'://'+env.username+':'+env.password+'@'+env.host+':'+env.port+'/'+env.database;
var sequelize = new Sequelize(conString, {
  dialect: 'postgres',
});

//db models
var User = require('../db/models/user');


////////////////////
// route handling //
////////////////////

// main signup route
signupRouter.route('/')
  .get(function(req,res){
    res.render('signup');
  })
  .post(function(req,res){
    var username = req.body.username;
    sequelize.sync().then(function() {
      User.findOne({
        where:{ 'username':username }
      })
      .then(function(matchedUser){
        if (matchedUser) { 
        res.send(500, "Username " + username + " is already taken."); 
        } else {
          bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, function(err, hash){
              sequelize.sync().then(function(){
                return User.create({
                  username: req.body.username,
                  hash: hash,
                  email: req.body.email,
                  latitude: req.body.latitude,
                  longitude: req.body.longitude,
                  createdAt: Date.now()
                });
              }).then(function(result){
                console.log('posted user to database');
                res.redirect("/login");
              })
            })
          });
        }
      });
    });
  });

// extra route to see if chosen user name exists
signupRouter.route('/signup/users/:username')
  .get(function(req, res){
    sequelize.sync().then(function() {
      User.findOne({
        where:{'username': req.params.username}
      }).then(function(result){
        res.send(200, result ? true : false);
      });
    });
  });


module.exports = signupRouter;  