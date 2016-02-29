///////////////////
// signup router //
///////////////////

// dependencies
var utils = require('../utils/utils');
var bcrypt = require('bcrypt');

// create express router 
var express = require('express');
var signupRouter = express.Router();

// db helpers
var sequelize = require('../db/config/sequelize_connection');
var User = require('../db/models/user');

//Geocoding
var geocoder = require('geocoder');


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
    var password = req.body.password;
    var email = req.body.email;
    var address = req.body.address;

    console.log('inside signup post:', req.body);

    // Geocoding: given an address return latitude and longitude
    geocoder.geocode(address, function ( err, data ) {
    // do something with data 
      if(err){
        console.log("Geocode was not successful for the following reason: " + status);
        return;
      } else {
        var latitude = data.results[0].geometry.location.lat;
        var longitude = data.results[0].geometry.location.lng;
        
        sequelize.sync().then(function() {
          User.findOne({
            where:{ 'username':username }
          })
          .then(function(matchedUser){
            if (matchedUser) { 
              res.send(500, "Username " + username + " is already taken."); 
            } else {
              bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(password, salt, function(err, hash){
                  sequelize.sync().then(function(){
                    return User.create({
                      username: username,
                      hash: hash,
                      email: email,
                      latitude: latitude,
                      longitude: longitude,
                      createdAt: Date.now()
                    });
                  })
                  .then(function(result){
                    res.redirect("/login");
                  }).catch(utils.handleError(req, res, 500, "Error writing new user to database"));
                });
              });
            }
          }).catch(utils.handleError(req, res, 500, "Error while trying to find user in database"));
        }).catch(utils.handleError(req, res, 500, "Error while trying to sync with database."));
      }
    });

  });

// extra route to see if chosen user name exists
signupRouter.route('/users/:username')
  .get(function(req, res){
    sequelize.sync().then(function() {
      User.findOne({
        where:{'username': req.params.username}
      }).then(function(result){
        res.send(200, result ? true : false);
      }).catch(utils.handleError(req, res, 500, "Error reading username from database."));
    }).catch(utils.handleError(req, res, 500, "Error while trying to sync with database."));
  });


module.exports = signupRouter;  