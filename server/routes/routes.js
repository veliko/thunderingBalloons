// utility functions
var flash = require('connect-flash');
var bcrypt = require('bcrypt');
var utils = require('../utils/utils');
var path = require('path');
var searchYelp = require('../utils/yelp');

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
var Event = require('../db/models/event');
var Invitee = require('../db/models/invitee');
var Message = require('../db/models/message');


//////////////////////////////////////////////////////
// configure endpoints ///////////////////////////////
//////////////////////////////////////////////////////
module.exports = function(app){


  ////////////////////////////
  // get request from users //
  ////////////////////////////
  app.route('/users')
   .get(utils.checkUser, function(req, res) {
     User.findAll({
       attributes: ["id", "username", "latitude", "longitude"]
     }).then(function(allUsers){
       res.send(200, allUsers);
     });
   });


  ///////////////////////////
  // get request from yelp //
  ///////////////////////////
  app.route('/places')
    .get(utils.checkUser, function(req, res) {
      console.log('in places route :');
      var term = req.query.term;
      var lat = req.query.lat;
      var lon = req.query.lng;

      console.log('inside yelp places route');
      searchYelp(term, lat, lon, function(data){
        res.json(data);
      });
    });


    ///////////////////////////
    // invite route handling //
    ///////////////////////////
    app.route('/invite')
      .put(utils.checkUser, function(req, res) {
        var uid = req.session.uid;
        var eid = req.body.eid;
        var status = req.body.status;

        var query = "UPDATE invitees SET current_status = '" + status + "' WHERE (uid = " + uid + " and eid = " + eid + ")";
        sequelize.query(query).spread(function(updated, metadata){
          if (updated) {
            res.send(200, "Invite updated")
          }
        });
      });


};




