///////////////////
// places router //
///////////////////

// utility functions
var utils = require('../utils/utils');
var searchYelp = require('../utils/yelp')

// create express router 
var express = require('express');
var placesRouter = express.Router(); 


////////////////////
// route handling //
////////////////////

  // main places route
  placesRouter.route('/')
    .get(utils.checkUser, function(req, res) {

      var term = req.query.term;
      var lat = req.query.lat;
      var lon = req.query.lng;

      searchYelp(term, lat, lon, function(data){
        res.json(data);
      });
    });


module.exports = placesRouter;