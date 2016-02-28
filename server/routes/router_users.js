//////////////////
// users router //
//////////////////

// utility functions
var utils = require('../utils/utils');

// create express router 
var express = require('express');
var usersRouter = express.Router(); 

// db helpers
var sequelize = require('../db/config/sequelize_connection');
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