//////////////////
// login router //
//////////////////

// dependencies
var bcrypt = require('bcrypt');
var utils = require('../utils/utils');

// create express router 
var express = require('express');
var loginRouter = express.Router();

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
loginRouter.route('/')
  .get(function(req,res){
    res.render('login');
  })
  .post(function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    sequelize.sync().then(function() {
      User.findOne({
        where: {'username': username} 
      })
      .then(function(matchedUser){
        if (!matchedUser) { res.redirect('/'); }
        else {
          bcrypt.compare(password, matchedUser.dataValues.hash, function(err, match) {
            if (match) {
              utils.createSession(req, res, username, matchedUser.dataValues.id);
            } else {
              res.render('login');
            }
          });
        }
      });
    });
  });


module.exports = loginRouter;
