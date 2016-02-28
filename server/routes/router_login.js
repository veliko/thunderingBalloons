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
var sequelize = require('../db/config/sequelize_connection');
var User = require('../db/models/user');


////////////////////
// route handling //
////////////////////

// main login route
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
      }).catch(utils.handleError(req, res, 500, "Error while trying to find user in database."));
    }).catch(utils.handleError(req, res, 500, "Error while trying to sync with database."));
  });


module.exports = loginRouter;
