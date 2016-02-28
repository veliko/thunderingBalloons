//////////////////
// users router //
//////////////////

// utility functions
var utils = require('../utils/utils');

// create express router 
var express = require('express');
var usersRouter = express.Router(); 

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

  // main users route
  usersRouter.route('/')
   .get(utils.checkUser, function(req, res) {
     User.findAll({
       attributes: ["id", "username", "latitude", "longitude"],
       where: {
         id: {
          $ne: req.session.uid 
         }
       },
     }).then(function(allUsers){
       res.send(200, allUsers);
     }).catch(utils.handleError(req, res, 500, "Unable to retrieve users from database"));
   });


module.exports = usersRouter;